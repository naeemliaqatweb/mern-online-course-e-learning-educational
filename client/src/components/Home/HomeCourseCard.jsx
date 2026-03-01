import React, { useEffect } from 'react';
import { Button } from '../ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPublishedCourses } from '../../features/courses/courseSlice';
import { useNavigate } from 'react-router-dom';

const HomeCourseCard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items: courses, loading } = useSelector((state) => state.courses);

    useEffect(() => {
        dispatch(fetchPublishedCourses());
    }, [dispatch]);

    if (loading) return <div className="text-center py-10">Loading featured courses...</div>;

    // Show only first 6 published courses on home
    const homeCourseCard = courses.slice(0, 6);

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-15' >
            {
                homeCourseCard.length > 0 ? homeCourseCard.map((item, index) =>
                    <div className='bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow' key={index}>
                        <img src={item.images && item.images[0]} className='h-50 w-full object-cover rounded-lg' alt={item.title} />

                        <div className="flex justify-between items-center mt-4">
                            <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${item.level === 'premium' ? 'bg-purple-100 text-purple-700' :
                                    item.level === 'advance' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                                }`}>
                                {item.level || 'free'}
                            </span>
                            <div className='text-gray-400 text-xs'>
                                {item.created_by}
                            </div>
                        </div>

                        <div className='mt-4'>
                            <h1 className='text-lg font-bold line-clamp-1'>{item.title}</h1>
                            <p className='text-sm text-gray-400 mt-2 line-clamp-2' dangerouslySetInnerHTML={{ __html: item.description?.replace(/<[^>]+>/g, '') }}></p>
                        </div>

                        <div className='flex gap-2 mt-4'>
                            {
                                item.tags && item.tags.slice(0, 2).map((tag, idx) => (
                                    <p key={idx} className='text-[10px] border border-gray-200 px-2 py-1 rounded-md text-gray-500'>{tag}</p>
                                ))
                            }
                        </div>

                        <Button
                            onClick={() => navigate(`/view-course/${item._id}`)}
                            className="bg-[#F1F1F3] hover:bg-orange-400 hover:text-white w-full py-6 mt-8 font-bold cursor-pointer transition-colors"
                        >
                            Get it Now
                        </Button>
                    </div>
                ) : <div className="col-span-full text-center py-10 text-gray-500">No courses discovered yet!</div>
            }
        </div>
    )
}

export default HomeCourseCard;
