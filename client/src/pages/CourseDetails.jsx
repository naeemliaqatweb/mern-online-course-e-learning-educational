import { useParams } from 'react-router-dom';
import timeIcon from "/images/Home/time-icon.svg"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Fragment, useState, useEffect } from 'react';
import VideoPlayer from '@/components/YouTubePlayer';
import CourseImageGallery from '@/components/CourseImageGallery';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourseDetails, clearCurrentCourse } from '../features/courses/courseSlice';
import ReactPlayer from 'react-player';
import { Button } from '@/components/ui/button';

const CourseDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { currentCourse: course, loading } = useSelector((state) => state.courses);
    const user = useSelector((state) => state.auth.user);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLesson, setSelectedLesson] = useState(null);

    useEffect(() => {
        if (id) {
            dispatch(fetchCourseDetails(id));
        }
        return () => {
            dispatch(clearCurrentCourse());
        };
    }, [dispatch, id]);

    const openModal = (lesson) => {
        setSelectedLesson(lesson);
        setIsModalOpen(true);
    };

    if (loading) return <div className="text-center py-20">Loading course details...</div>;
    if (!course) return <div className="text-center py-20">Course not found.</div>;

    const canAccessCourse = () => {
        if (!user) {
            console.log('Access Denied: No user');
            return false;
        }
        if (!user.currentPlan) {
            console.log('Access Denied: No current plan');
            return false;
        }

        // Check expiry
        if (user.planExpiryDate && new Date() > new Date(user.planExpiryDate)) {
            console.log('Access Denied: Plan expired', user.planExpiryDate);
            return false;
        }

        const userPlan = user.currentPlan;
        const courseLevel = course.level || 'free';

        if (user.role === 'admin') return true;
        if (courseLevel === 'free') return true;
        if (!userPlan) return false;
        if (userPlan === 'premium') return true;
        if (userPlan === 'advance') return courseLevel === 'free' || courseLevel === 'advance';
        if (userPlan === 'free') return courseLevel === 'free';

        console.log('Access Denied: Plan level mismatch');
        return false;
    };

    const hasAccess = canAccessCourse();

    return (
        <div className='container m-auto px-5 lg:px-0'>

            <div className='grid grid-cols-1 md:grid-cols-2 py-10 gap-10 px-3 border-b border-gray-200'>
                <h1 className='text-5xl font-bold'>{course.title}</h1>
                <div
                    className="text-gray-600 text-lg prose prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: course.description }}
                />
            </div> <div className='my-10'>
                <CourseImageGallery images={course.images} />
            </div>

            {!hasAccess ? (
                <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center my-10">
                    <h2 className="text-2xl font-bold text-red-700 mb-4">Access Denied</h2>
                    <p className="text-gray-600 mb-6">
                        You need a <strong>{course.level}</strong> plan or higher to access this course.
                        {user && user.planExpiryDate && new Date() > new Date(user.planExpiryDate) && (
                            <span className="block mt-2 text-red-600">Your current plan has expired.</span>
                        )}
                    </p>
                    <Button onClick={() => window.location.href = '/pricing'} className="bg-red-600 hover:bg-red-700 text-white">
                        Upgrade Plan
                    </Button>
                </div>
            ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 gap-15 mt-10 mb-20'>
                    {
                        course.curriculum && course.curriculum.map((curriculumLesson, index) =>
                            <div key={index} className='bg-white p-10 rounded-lg border border-[#F1F1F3] space-y-6'>
                                <h1 className='text-right text-6xl font-bold'>{String(index + 1).padStart(2, '0')}</h1>
                                <h2 className='text-2xl font-bold my-5'>{curriculumLesson.section}</h2>
                                {
                                    curriculumLesson.lessons.map((lesson, lesIndex) =>
                                        <div
                                            key={lesIndex}
                                            onClick={() => openModal(lesson)}
                                            className={`block lg:flex justify-between bg-white border-2 items-center ${lesIndex == 1 ? "border-[#FFD599] shadow-border-yellow shadow-[1px_1px_6px_#FFD599]" : "border-[#F1F1F3]"} p-6 rounded-lg cursor-pointer `}>
                                            <div className=''>
                                                <h1 className='text-md font-bold'>{lesson.title}</h1>
                                                <p className='text-gray-400'>{lesson.name}</p>
                                            </div>
                                            <div className={`flex items-center justify-center gap-2 ${lesIndex == 1 ? "bg-[#FFEACC]" : "bg-[#F7F7F8]"} py-2 px-5 rounded-lg`}>
                                                <img src={timeIcon} className='w-4 h-4' alt="" />
                                                <p className='text-[#59595A]'>{lesson.duration}</p>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>

                        )
                    }
                </div>
            )}
            {/* Video Popup Modal */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="max-w-[90vw] md:max-w-[1000px] lg:max-w-[1200px] bg-white rounded-lg shadow-lg">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-semibold text-gray-800">{selectedLesson?.title}</DialogTitle>
                    </DialogHeader>
                    <div className="w-full flex justify-center">
                        {selectedLesson?.video_url ? (
                            <div className="w-full rounded-lg overflow-hidden">
                                <ReactPlayer
                                    url={selectedLesson.video_url}
                                    width="100%"
                                    height="500px"
                                    controls
                                />
                            </div>
                        ) : (
                            <p className="text-center text-gray-500">No video available</p>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default CourseDetails
