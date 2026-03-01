import React, { Fragment } from 'react'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'

const CourseCard = ({ id, index, title, description, images, tags, curriculum, created_by, level }) => {

    const navigate = useNavigate();

    return (
        <div className='bg-white p-5 my-4 rounded-lg' key={index}>
            <div className='flex-1/2 md:flex items-center justify-between'>
                <div className='py-2'>
                    <div className="flex items-center gap-3 mb-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${level === 'premium' ? 'bg-purple-100 text-purple-700 border border-purple-200' :
                            level === 'advance' ? 'bg-blue-100 text-blue-700 border border-blue-200' :
                                'bg-green-100 text-green-700 border border-green-200'
                            }`}>
                            {level || 'Free'}
                        </span>
                    </div>
                    <h1 className='text-2xl font-bold'>{title}</h1>
                    <p className='text-gray-400'>{description}</p>
                </div>
                <Button onClick={() => navigate(`/view-course/${id}`)} className="border border-gray-400 cursor-pointer">View Course</Button>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-5'>
                {
                    images.length > 0 ? images.map((img, i) => <img key={i} src={img} className='rounded-2xl w-100 h-80' alt="" />) : null
                }
            </div>
            <div className="flex-1/2 md:flex justify-between items-center border-b border-b-gray-300  mt-5 pb-10 ">
                <div className='flex gap-4 mt-5'>
                    {
                        tags.length > 0 ? tags.map((tag, i) => <p key={i} className='text-sm border border-gray-300 p-2 rounded-[10px]'>{tag}</p>) : null
                    }
                </div>
                <div className='text-sm text-gray-400 mt-5 md:mt-0'>
                    {created_by}
                </div>
            </div>

            <div className="mt-15 rounded-lg border border-gray-300">
                <h1 className='font-bold border-b border-b-gray-300 p-5 text-2xl'>Curriculum</h1>
                <div className='grid grid-cols-1 md:grid-cols-5 gap-3 p-5'>
                    {
                        curriculum.length > 0 ? curriculum.map((item, index) =>
                            <Fragment key={index}>
                                <div className='border-b border-b-gray-300 last:border-b-0 md:border-r md:border-r-gray-300 md:border-b-0 last:border-r-0 px-3 py-5 '>
                                    <h1 className='text-4xl font-bold'>{String(index + 1).padStart(2, '0')}</h1>
                                    <h4 className='py-5 text-gray-500'>{item.section}</h4>
                                </div>
                            </Fragment>
                        ) : null
                    }

                </div>
            </div>
        </div>
    )
}

export default CourseCard
