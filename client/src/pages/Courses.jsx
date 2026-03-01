import CourseCard from '@/components/Home/CourseCard'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchPublishedCourses, fetchAllowedCourses } from '../features/courses/courseSlice';

const Courses = () => {
  const dispatch = useDispatch();
  const { items: courses, loading } = useSelector((state) => state.courses);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {

    if (user) {
      console.log(user, 'user');
      dispatch(fetchAllowedCourses());
    } else {
      dispatch(fetchPublishedCourses());
    }
  }, [dispatch, user]);

  return (
    <div className='container m-auto'>
      <div className='grid grid-cols-1 md:grid-cols-2 py-10 gap-10 px-3 border-b border-gray-200'>
        <h1 className='text-5xl font-bold'>Online Courses on Design and Development</h1>
        <p>Welcome to our online course page, where you can enhance your skills in design and development.
          Choose from our carefully curated selection of courses designed to provide you with comprehensive knowledge and practical experience.
          Explore the courses below and find the perfect fit for your learning journey.
        </p>

      </div>
      <div className='my-20'>
        {loading ? (
          <div className="text-center py-10">Loading courses...</div>
        ) : (
          (() => {
            // Filter courses based on user plan
            const userPlan = user?.currentPlan;
            console.log(userPlan);

            if (!user) {
              return (
                <div className="text-center py-10">
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">Access Restricted</h3>
                  <p className="text-gray-500 mb-4">Please login to view our courses.</p>
                  <a href="/login" className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                    Login
                  </a>
                </div>
              );
            }

            // Courses are already filtered by backend
            const filteredCourses = courses;

            return filteredCourses.length > 0 ? (
              filteredCourses.map((items, index) => (
                <CourseCard key={index}
                  id={items._id}
                  title={items.title}
                  description={items.description}
                  images={items.images}
                  tags={items.tags}
                  curriculum={items.curriculum}
                  created_by={items.created_by}
                  level={items.level}
                />
              ))
            ) : (
              <div className="text-center py-10">
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No Courses Available</h3>
                <p className="text-gray-500">There are no courses available for your current plan.</p>
              </div>
            );
          })()
        )}
      </div>
    </div>
  )
}

export default Courses
