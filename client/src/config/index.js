
import HomeCourse1 from "/images/HomeCourse/HomeCourse1.png";
import HomeCourse2 from "/images/HomeCourse/HomeCourse2.png";
import HomeCourse3 from "/images/HomeCourse/HomeCourse3.png";
import HomeCourse4 from "/images/HomeCourse/HomeCourse4.png";

import testimonial1 from "/images/HomeTestimonials/testimonial1.png";
import testimonial2 from "/images/HomeTestimonials/testimonial2.png";
import testimonial3 from "/images/HomeTestimonials/testimonial3.png";
import testimonial4 from "/images/HomeTestimonials/testimonial4.png";

import AchievementIcon1 from "/images/Home/objects-tools01.svg";
import AchievementIcon2 from "/images/Home/objects-tools02.svg";
import AchievementIcon3 from "/images/Home/objects-tools03.svg";
import AchievementIcon4 from "/images/Home/objects-tools04.svg";

import GoalsIcon1 from "/images/Home/objects-tools05.svg";
import GoalsIcon2 from "/images/Home/objects-tools06.svg";
import GoalsIcon3 from "/images/Home/objects-tools07.svg";
import GoalsIcon4 from "/images/Home/objects-tools08.svg";

const homeCourseCard = [
    {
        id:1,
        title: "Web Design Fundamentals",
        description: "Learn the fundamentals of web design, including HTML, CSS, and responsive design principles. Develop the skills to create visually appealing and user-friendly websites.",
        images:[HomeCourse1,HomeCourse2,HomeCourse3,HomeCourse3],
        tags:['4 Weeks', 'Beginner'],
        // curriculum: ['Introduction to HTML', 'Styling with CSS','Introduction to Responsive Design','Design Principles for Web','Building a Basic Website'],
        created_by: "By John Smith",
        curriculum: [
            {
                section: "Introduction to HTML",
                lessons: [
                    {
                        name: "Lesson 01",
                        title: "Understanding UI/UX Design Principles",
                        duration: "10 Min",
                        video_url: "https://www.youtube.com/embed/1IJtgCn6jsg?si=x55Q91c-UnoiZPTh",
                        description: "An overview of UI/UX design principles.",
                        resources: ["https://example.com/resource1"]
                    },
                    {
                        name: "Lesson 02",
                        title: "Importance of User-Centered Design",
                        duration: "15 Min",
                        video_url: "https://www.youtube.com/embed/1IJtgCn6jsg?si=x55Q91c-UnoiZPTh",
                        description: "Understanding the importance of user-centered design.",
                        resources: []
                    }
                ]
            },
            {
                section: "Styling with CSS",
                lessons: [
                    {
                        name: "Lesson 01",
                        title: "Conducting User Research",
                        duration: "12 Min",
                        video_url: "https://www.youtube.com/embed/1IJtgCn6jsg?si=x55Q91c-UnoiZPTh",
                        description: "How to conduct effective user research.",
                        resources: ["https://example.com/resource2"]
                    },
                    {
                        name: "Lesson 02",
                        title: "Analyzing User Needs",
                        duration: "18 Min",
                        video_url: "https://example.com/video4",
                        description: "Techniques to analyze user needs and behavior.",
                        resources: []
                    }
                ]
            },
            {
                section: "Introduction to Responsive Design",
                lessons: [
                    {
                        name: "Lesson 01",
                        title: "Conducting User Research",
                        duration: "12 Min",
                        video_url: "https://www.youtube.com/embed/1IJtgCn6jsg?si=x55Q91c-UnoiZPTh",
                        description: "How to conduct effective user research.",
                        resources: ["https://example.com/resource2"]
                    },
                    {
                        name: "Lesson 02",
                        title: "Analyzing User Needs",
                        duration: "18 Min",
                        video_url: "https://example.com/video4",
                        description: "Techniques to analyze user needs and behavior.",
                        resources: []
                    }
                ]
            },
            {
                section: "Design Principles for Web",
                lessons: [
                    {
                        name: "Lesson 01",
                        title: "Conducting User Research",
                        duration: "12 Min",
                        video_url: "https://www.youtube.com/embed/1IJtgCn6jsg?si=x55Q91c-UnoiZPTh",
                        description: "How to conduct effective user research.",
                        resources: ["https://example.com/resource2"]
                    },
                    {
                        name: "Lesson 02",
                        title: "Analyzing User Needs",
                        duration: "18 Min",
                        video_url: "https://example.com/video4",
                        description: "Techniques to analyze user needs and behavior.",
                        resources: []
                    }
                ]
            },
            {
                section: "Building a Basic Website",
                lessons: [
                    {
                        name: "Lesson 01",
                        title: "Conducting User Research",
                        duration: "12 Min",
                        video_url: "https://www.youtube.com/embed/1IJtgCn6jsg?si=x55Q91c-UnoiZPTh",
                        description: "How to conduct effective user research.",
                        resources: ["https://example.com/resource2"]
                    },
                    {
                        name: "Lesson 02",
                        title: "Analyzing User Needs",
                        duration: "18 Min",
                        video_url: "https://example.com/video4",
                        description: "Techniques to analyze user needs and behavior.",
                        resources: []
                    }
                ]
            }
        ]
    },
    {
        id:2,
        title: "UI/UX Design",
        description: "Master the art of creating intuitive user interfaces (UI) and enhancing user experiences (UX). Learn design principles, wireframing, prototyping, and usability testing techniques.",
        images:[HomeCourse2,HomeCourse1,HomeCourse3,HomeCourse3],
        tags:['4 Weeks', 'Beginner'],
        // curriculum: ['Introduction to UI/UX Design', 'User Research and Personas','Wireframing and Prototyping','Visual Design and Branding','Usability Testing and Iteration'],
        created_by: "By John Smith",
        curriculum: [
            {
                section: "Introduction to HTML",
                lessons: [
                    {
                        name: "Lesson 01",
                        title: "Understanding UI/UX Design Principles",
                        duration: "10 Min",
                        video_url: "https://www.youtube.com/embed/1IJtgCn6jsg?si=x55Q91c-UnoiZPTh",
                        description: "An overview of UI/UX design principles.",
                        resources: ["https://example.com/resource1"]
                    },
                    {
                        name: "Lesson 02",
                        title: "Importance of User-Centered Design",
                        duration: "1 Hour",
                        video_url: "https://www.youtube.com/embed/1IJtgCn6jsg?si=x55Q91c-UnoiZPTh",
                        description: "Understanding the importance of user-centered design.",
                        resources: []
                    },
                    {
                        name: "Lesson 03",
                        title: "Importance of User-Centered Design",
                        duration: "45 Minutes",
                        video_url: "https://www.youtube.com/embed/1IJtgCn6jsg?si=x55Q91c-UnoiZPTh",
                        description: "Understanding the importance of user-centered design.",
                        resources: []
                    }
                ]
            },
            {
                section: "User Research and Analysis",
                lessons: [
                    {
                        name: "Lesson 01",
                        title: "Conducting User Research and Interviews",
                        duration: "1 Hour",
                        video_url: "https://www.youtube.com/embed/1IJtgCn6jsg?si=x55Q91c-UnoiZPTh",
                        description: "How to conduct effective user research.",
                        resources: ["https://example.com/resource2"]
                    },
                    {
                        name: "Lesson 02",
                        title: "Analyzing User Needs and Behavior",
                        duration: "18 Min",
                        video_url: "https://example.com/video4",
                        description: "Techniques to analyze user needs and behavior.",
                        resources: []
                    }
                ]
            },
            {
                section: "Introduction to Responsive Design",
                lessons: [
                    {
                        name: "Lesson 01",
                        title: "Conducting User Research",
                        duration: "12 Min",
                        video_url: "https://www.youtube.com/embed/1IJtgCn6jsg?si=x55Q91c-UnoiZPTh",
                        description: "How to conduct effective user research.",
                        resources: ["https://example.com/resource2"]
                    },
                    {
                        name: "Lesson 02",
                        title: "Analyzing User Needs",
                        duration: "18 Min",
                        video_url: "https://example.com/video4",
                        description: "Techniques to analyze user needs and behavior.",
                        resources: []
                    }
                ]
            },
            {
                section: "Design Principles for Web",
                lessons: [
                    {
                        name: "Lesson 01",
                        title: "Conducting User Research",
                        duration: "12 Min",
                        video_url: "https://www.youtube.com/embed/1IJtgCn6jsg?si=x55Q91c-UnoiZPTh",
                        description: "How to conduct effective user research.",
                        resources: ["https://example.com/resource2"]
                    },
                    {
                        name: "Lesson 02",
                        title: "Analyzing User Needs",
                        duration: "18 Min",
                        video_url: "https://example.com/video4",
                        description: "Techniques to analyze user needs and behavior.",
                        resources: []
                    }
                ]
            },
            {
                section: "Building a Basic Website",
                lessons: [
                    {
                        name: "Lesson 01",
                        title: "Conducting User Research",
                        duration: "12 Min",
                        video_url: "https://www.youtube.com/embed/1IJtgCn6jsg?si=x55Q91c-UnoiZPTh",
                        description: "How to conduct effective user research.",
                        resources: ["https://example.com/resource2"]
                    },
                    {
                        name: "Lesson 02",
                        title: "Analyzing User Needs",
                        duration: "18 Min",
                        video_url: "https://example.com/video4",
                        description: "Techniques to analyze user needs and behavior.",
                        resources: []
                    }
                ]
            }
        ]
    },
    {
        id:3,
        title: "Mobile App Development",
        description: "Dive into the world of mobile app development. Learn to build native iOS and Android applications using industry-leading frameworks like Swift and Kotlin.",
        images:[HomeCourse3,HomeCourse2,HomeCourse1,HomeCourse3,HomeCourse3,HomeCourse2,HomeCourse1,HomeCourse3],
        tags:['4 Weeks', 'Beginner'],
        // curriculum: ['Introduction to HTML', 'Styling with CSS','Introduction to Responsive Design','Design Principles for Web','Building a Basic Website'],
        created_by: "By John Smith",
        curriculum: [
            {
                section: "Introduction to HTML",
                lessons: [
                    {
                        name: "Lesson 01",
                        title: "Understanding UI/UX Design Principles",
                        duration: "10 Min",
                        video_url: "https://www.youtube.com/embed/1IJtgCn6jsg?si=x55Q91c-UnoiZPTh",
                        description: "An overview of UI/UX design principles.",
                        resources: ["https://example.com/resource1"]
                    },
                    {
                        name: "Lesson 02",
                        title: "Importance of User-Centered Design",
                        duration: "15 Min",
                        video_url: "https://www.youtube.com/embed/1IJtgCn6jsg?si=x55Q91c-UnoiZPTh",
                        description: "Understanding the importance of user-centered design.",
                        resources: []
                    }
                ]
            },
            {
                section: "Styling with CSS",
                lessons: [
                    {
                        name: "Lesson 01",
                        title: "Conducting User Research",
                        duration: "12 Min",
                        video_url: "https://www.youtube.com/embed/1IJtgCn6jsg?si=x55Q91c-UnoiZPTh",
                        description: "How to conduct effective user research.",
                        resources: ["https://example.com/resource2"]
                    },
                    {
                        name: "Lesson 02",
                        title: "Analyzing User Needs",
                        duration: "18 Min",
                        video_url: "https://example.com/video4",
                        description: "Techniques to analyze user needs and behavior.",
                        resources: []
                    }
                ]
            },
            {
                section: "Introduction to Responsive Design",
                lessons: [
                    {
                        name: "Lesson 01",
                        title: "Conducting User Research",
                        duration: "12 Min",
                        video_url: "https://www.youtube.com/embed/1IJtgCn6jsg?si=x55Q91c-UnoiZPTh",
                        description: "How to conduct effective user research.",
                        resources: ["https://example.com/resource2"]
                    },
                    {
                        name: "Lesson 02",
                        title: "Analyzing User Needs",
                        duration: "18 Min",
                        video_url: "https://example.com/video4",
                        description: "Techniques to analyze user needs and behavior.",
                        resources: []
                    }
                ]
            },
            {
                section: "Design Principles for Web",
                lessons: [
                    {
                        name: "Lesson 01",
                        title: "Conducting User Research",
                        duration: "12 Min",
                        video_url: "https://www.youtube.com/embed/1IJtgCn6jsg?si=x55Q91c-UnoiZPTh",
                        description: "How to conduct effective user research.",
                        resources: ["https://example.com/resource2"]
                    },
                    {
                        name: "Lesson 02",
                        title: "Analyzing User Needs",
                        duration: "18 Min",
                        video_url: "https://example.com/video4",
                        description: "Techniques to analyze user needs and behavior.",
                        resources: []
                    }
                ]
            },
            {
                section: "Building a Basic Website",
                lessons: [
                    {
                        name: "Lesson 01",
                        title: "Conducting User Research",
                        duration: "12 Min",
                        video_url: "https://www.youtube.com/embed/1IJtgCn6jsg?si=x55Q91c-UnoiZPTh",
                        description: "How to conduct effective user research.",
                        resources: ["https://example.com/resource2"]
                    },
                    {
                        name: "Lesson 02",
                        title: "Analyzing User Needs",
                        duration: "18 Min",
                        video_url: "https://example.com/video4",
                        description: "Techniques to analyze user needs and behavior.",
                        resources: []
                    }
                ]
            }
        ]
    },
    {
        id:4,
        title: "Graphic Design for Beginners",
        description: "Discover the fundamentals of graphic design, including typography, color theory, layout design, and image manipulation techniques. Create visually stunning designs for print and digital media.",
        images:[HomeCourse4,HomeCourse2,HomeCourse3,HomeCourse1],
        tags:['4 Weeks', 'Beginner'],
        // curriculum: ['Introduction to HTML', 'Styling with CSS','Introduction to Responsive Design','Design Principles for Web','Building a Basic Website'],
        created_by: "By John Smith",
        curriculum: [
            {
                section: "Introduction to HTML",
                lessons: [
                    {
                        name: "Lesson 01",
                        title: "Understanding UI/UX Design Principles",
                        duration: "10 Min",
                        video_url: "https://www.youtube.com/embed/1IJtgCn6jsg?si=x55Q91c-UnoiZPTh",
                        description: "An overview of UI/UX design principles.",
                        resources: ["https://example.com/resource1"]
                    },
                    {
                        name: "Lesson 02",
                        title: "Importance of User-Centered Design",
                        duration: "15 Min",
                        video_url: "https://www.youtube.com/embed/1IJtgCn6jsg?si=x55Q91c-UnoiZPTh",
                        description: "Understanding the importance of user-centered design.",
                        resources: []
                    }
                ]
            },
            {
                section: "Styling with CSS",
                lessons: [
                    {
                        name: "Lesson 01",
                        title: "Conducting User Research",
                        duration: "12 Min",
                        video_url: "https://www.youtube.com/embed/1IJtgCn6jsg?si=x55Q91c-UnoiZPTh",
                        description: "How to conduct effective user research.",
                        resources: ["https://example.com/resource2"]
                    },
                    {
                        name: "Lesson 02",
                        title: "Analyzing User Needs",
                        duration: "18 Min",
                        video_url: "https://example.com/video4",
                        description: "Techniques to analyze user needs and behavior.",
                        resources: []
                    }
                ]
            },
            {
                section: "Introduction to Responsive Design",
                lessons: [
                    {
                        name: "Lesson 01",
                        title: "Conducting User Research",
                        duration: "12 Min",
                        video_url: "https://www.youtube.com/embed/1IJtgCn6jsg?si=x55Q91c-UnoiZPTh",
                        description: "How to conduct effective user research.",
                        resources: ["https://example.com/resource2"]
                    },
                    {
                        name: "Lesson 02",
                        title: "Analyzing User Needs",
                        duration: "18 Min",
                        video_url: "https://example.com/video4",
                        description: "Techniques to analyze user needs and behavior.",
                        resources: []
                    }
                ]
            },
            {
                section: "Design Principles for Web",
                lessons: [
                    {
                        name: "Lesson 01",
                        title: "Conducting User Research",
                        duration: "12 Min",
                        video_url: "https://www.youtube.com/embed/1IJtgCn6jsg?si=x55Q91c-UnoiZPTh",
                        description: "How to conduct effective user research.",
                        resources: ["https://example.com/resource2"]
                    },
                    {
                        name: "Lesson 02",
                        title: "Analyzing User Needs",
                        duration: "18 Min",
                        video_url: "https://example.com/video4",
                        description: "Techniques to analyze user needs and behavior.",
                        resources: []
                    }
                ]
            },
            {
                section: "Building a Basic Website",
                lessons: [
                    {
                        name: "Lesson 01",
                        title: "Conducting User Research",
                        duration: "12 Min",
                        video_url: "https://www.youtube.com/embed/1IJtgCn6jsg?si=x55Q91c-UnoiZPTh",
                        description: "How to conduct effective user research.",
                        resources: ["https://example.com/resource2"]
                    },
                    {
                        name: "Lesson 02",
                        title: "Analyzing User Needs",
                        duration: "18 Min",
                        video_url: "https://example.com/video4",
                        description: "Techniques to analyze user needs and behavior.",
                        resources: []
                    }
                ]
            }
        ]
    },
    {
        id:5,
        title: "Front-End Web Development",
        description: "Become proficient in front-end web development. Learn HTML, CSS, JavaScript, and popular frameworks like Bootstrap and React. Build interactive and responsive websites.",
        images:[HomeCourse1,HomeCourse2,HomeCourse3,HomeCourse3],
        tags:['4 Weeks', 'Intermediate'],
        // curriculum: ['Introduction to HTML', 'Styling with CSS','Introduction to Responsive Design','Design Principles for Web','Building a Basic Website'],
        created_by: "By John Smith",
        curriculum: [
            {
                section: "Introduction to HTML",
                lessons: [
                    {
                        name: "Lesson 01",
                        title: "Understanding UI/UX Design Principles",
                        duration: "10 Min",
                        video_url: "https://www.youtube.com/embed/1IJtgCn6jsg?si=x55Q91c-UnoiZPTh",
                        description: "An overview of UI/UX design principles.",
                        resources: ["https://example.com/resource1"]
                    },
                    {
                        name: "Lesson 02",
                        title: "Importance of User-Centered Design",
                        duration: "15 Min",
                        video_url: "https://www.youtube.com/embed/1IJtgCn6jsg?si=x55Q91c-UnoiZPTh",
                        description: "Understanding the importance of user-centered design.",
                        resources: []
                    }
                ]
            },
            {
                section: "Styling with CSS",
                lessons: [
                    {
                        name: "Lesson 01",
                        title: "Conducting User Research",
                        duration: "12 Min",
                        video_url: "https://www.youtube.com/embed/1IJtgCn6jsg?si=x55Q91c-UnoiZPTh",
                        description: "How to conduct effective user research.",
                        resources: ["https://example.com/resource2"]
                    },
                    {
                        name: "Lesson 02",
                        title: "Analyzing User Needs",
                        duration: "18 Min",
                        video_url: "https://example.com/video4",
                        description: "Techniques to analyze user needs and behavior.",
                        resources: []
                    }
                ]
            },
            {
                section: "Introduction to Responsive Design",
                lessons: [
                    {
                        name: "Lesson 01",
                        title: "Conducting User Research",
                        duration: "12 Min",
                        video_url: "https://www.youtube.com/embed/1IJtgCn6jsg?si=x55Q91c-UnoiZPTh",
                        description: "How to conduct effective user research.",
                        resources: ["https://example.com/resource2"]
                    },
                    {
                        name: "Lesson 02",
                        title: "Analyzing User Needs",
                        duration: "18 Min",
                        video_url: "https://example.com/video4",
                        description: "Techniques to analyze user needs and behavior.",
                        resources: []
                    }
                ]
            },
            {
                section: "Design Principles for Web",
                lessons: [
                    {
                        name: "Lesson 01",
                        title: "Conducting User Research",
                        duration: "12 Min",
                        video_url: "https://www.youtube.com/embed/1IJtgCn6jsg?si=x55Q91c-UnoiZPTh",
                        description: "How to conduct effective user research.",
                        resources: ["https://example.com/resource2"]
                    },
                    {
                        name: "Lesson 02",
                        title: "Analyzing User Needs",
                        duration: "18 Min",
                        video_url: "https://example.com/video4",
                        description: "Techniques to analyze user needs and behavior.",
                        resources: []
                    }
                ]
            },
            {
                section: "Building a Basic Website",
                lessons: [
                    {
                        name: "Lesson 01",
                        title: "Conducting User Research",
                        duration: "12 Min",
                        video_url: "https://www.youtube.com/embed/1IJtgCn6jsg?si=x55Q91c-UnoiZPTh",
                        description: "How to conduct effective user research.",
                        resources: ["https://example.com/resource2"]
                    },
                    {
                        name: "Lesson 02",
                        title: "Analyzing User Needs",
                        duration: "18 Min",
                        video_url: "https://example.com/video4",
                        description: "Techniques to analyze user needs and behavior.",
                        resources: []
                    }
                ]
            }
        ]
    },
    {
        id:6,
        title: "Front-End Web Development",
        description: "Become proficient in front-end web development. Learn HTML, CSS, JavaScript, and popular frameworks like Bootstrap and React. Build interactive and responsive websites.",
        images:[HomeCourse1,HomeCourse2,HomeCourse3,HomeCourse3],
        tags:['4 Weeks', 'Intermediate'],
        // curriculum: ['Introduction to HTML', 'Styling with CSS','Introduction to Responsive Design','Design Principles for Web','Building a Basic Website'],
        created_by: "By John Smith",
        curriculum: [
            {
                section: "Introduction to HTML",
                lessons: [
                    {
                        name: "Lesson 01",
                        title: "Understanding UI/UX Design Principles",
                        duration: "10 Min",
                        video_url: "https://www.youtube.com/embed/1IJtgCn6jsg?si=x55Q91c-UnoiZPTh",
                        description: "An overview of UI/UX design principles.",
                        resources: ["https://example.com/resource1"]
                    },
                    {
                        name: "Lesson 02",
                        title: "Importance of User-Centered Design",
                        duration: "15 Min",
                        video_url: "https://www.youtube.com/embed/1IJtgCn6jsg?si=x55Q91c-UnoiZPTh",
                        description: "Understanding the importance of user-centered design.",
                        resources: []
                    }
                ]
            },
            {
                section: "Styling with CSS",
                lessons: [
                    {
                        name: "Lesson 01",
                        title: "Conducting User Research",
                        duration: "12 Min",
                        video_url: "https://www.youtube.com/embed/1IJtgCn6jsg?si=x55Q91c-UnoiZPTh",
                        description: "How to conduct effective user research.",
                        resources: ["https://example.com/resource2"]
                    },
                    {
                        name: "Lesson 02",
                        title: "Analyzing User Needs",
                        duration: "18 Min",
                        video_url: "https://example.com/video4",
                        description: "Techniques to analyze user needs and behavior.",
                        resources: []
                    }
                ]
            },
            {
                section: "Introduction to Responsive Design",
                lessons: [
                    {
                        name: "Lesson 01",
                        title: "Conducting User Research",
                        duration: "12 Min",
                        video_url: "https://www.youtube.com/embed/1IJtgCn6jsg?si=x55Q91c-UnoiZPTh",
                        description: "How to conduct effective user research.",
                        resources: ["https://example.com/resource2"]
                    },
                    {
                        name: "Lesson 02",
                        title: "Analyzing User Needs",
                        duration: "18 Min",
                        video_url: "https://example.com/video4",
                        description: "Techniques to analyze user needs and behavior.",
                        resources: []
                    }
                ]
            },
            {
                section: "Design Principles for Web",
                lessons: [
                    {
                        name: "Lesson 01",
                        title: "Conducting User Research",
                        duration: "12 Min",
                        video_url: "https://www.youtube.com/embed/1IJtgCn6jsg?si=x55Q91c-UnoiZPTh",
                        description: "How to conduct effective user research.",
                        resources: ["https://example.com/resource2"]
                    },
                    {
                        name: "Lesson 02",
                        title: "Analyzing User Needs",
                        duration: "18 Min",
                        video_url: "https://example.com/video4",
                        description: "Techniques to analyze user needs and behavior.",
                        resources: []
                    }
                ]
            },
            {
                section: "Building a Basic Website",
                lessons: [
                    {
                        name: "Lesson 01",
                        title: "Conducting User Research",
                        duration: "12 Min",
                        video_url: "https://www.youtube.com/embed/1IJtgCn6jsg?si=x55Q91c-UnoiZPTh",
                        description: "How to conduct effective user research.",
                        resources: ["https://example.com/resource2"]
                    },
                    {
                        name: "Lesson 02",
                        title: "Analyzing User Needs",
                        duration: "18 Min",
                        video_url: "https://example.com/video4",
                        description: "Techniques to analyze user needs and behavior.",
                        resources: []
                    }
                ]
            }
        ]
    }
  ];


  const testimonials  = [
    {
        id: 1,
        name: "Sarah L",
        description: "The web design course provided a solid foundation for me. The instructors were knowledgeable and supportive, and the interactive learning environment was engaging. I highly recommend it!",
        image: testimonial1,
    },
    {
        id: 2,
        name: "Jason M",
        description: "The UI/UX design course exceeded my expectations. The instructor's expertise and practical assignments helped me improve my design skills. I feel more confident in my career now. Thank you!",
        image: testimonial2,
    },
    {
        id: 3,
        name: "Emily R",
        description: "The mobile app development course was fantastic! The step-by-step tutorials and hands-on projects helped me grasp the concepts easily. I'm now building my own app. Great course!",
        image: testimonial3,
    },
    {
        id: 4,
        name: "Michael K",
        description: "I enrolled in the graphic design course as a beginner, and it was the perfect starting point. The instructor's guidance and feedback improved my design abilities significantly. I'm grateful for this course!",
        image: testimonial4,
    }
  ];

  const benefitCard = [
    {
        id: 1,
        title: "Flexible Learning Schedule",
        description : "Fit your coursework around your existing commitments and obligations.",
        link:"/course/1"
    },
    {
        id: 2,
        title: "Flexible Learning Schedule",
        description : "Fit your coursework around your existing commitments and obligations.",
        link:"/course/1"
    },
    {
        id: 3,
        title: "Flexible Learning Schedule",
        description : "Fit your coursework around your existing commitments and obligations.",
        link:"/course/1"
    },
    {
        id: 4,
        title: "Flexible Learning Schedule",
        description : "Fit your coursework around your existing commitments and obligations.",
        link:"/course/1"
    },
    {
        id: 5,
        title: "Flexible Learning Schedule",
        description : "Fit your coursework around your existing commitments and obligations.",
        link:"/course/1"
    },
    {
        id: 6,
        title: "Flexible Learning Schedule",
        description : "Fit your coursework around your existing commitments and obligations.",
        link:"/course/1"
    }
    ];

    const priceCard = {
    monthly: {
        free: { name: "Free Plan", price: 0, features: [
            { text: "Access to selected free courses.", available: true },
            { text: "Limited course materials and resources.", available: true },
            { text: "Basic community support.", available: true },
            { text: "No certification upon completion.", available: true },
            { text: "Ad-supported platform.", available: true },
            { text: "Access to exclusive Pro Plan community forums.", available: false },
            { text: "Early access to new courses and updates.", available: false }
        ] },
        pro: { name: "Pro Plan", price: 79, features: [
            { text: "Unlimited access to all courses.", available: true },
            { text: "Unlimited course materials and resources.", available: true },
            { text: "Priority support from instructors.", available: true },
            { text: "Course completion certificates.", available: true },
            { text: "Ad-free experience.", available: true },
            { text: "Access to exclusive Pro Plan community forums.", available: true },
            { text: "Early access to new courses and updates.", available: true }
        ] }
    },
    yearly: {
        free: { name: "Free Plan", price: 0, features: [
            { text: "Access to selected free courses.", available: true },
            { text: "Limited course materials and resources.", available: true },
            { text: "Basic community support.", available: true },
            { text: "No certification upon completion.", available: true },
            { text: "Ad-supported platform.", available: true },
            { text: "Access to exclusive Pro Plan community forums.", available: false },
            { text: "Early access to new courses and updates.", available: false }
        ] },
        pro: { name: "Pro Plan", price: 790, features: [
            { text: "Unlimited access to all courses.", available: true },
            { text: "Unlimited course materials and resources.", available: true },
            { text: "Priority support from instructors.", available: true },
            { text: "Course completion certificates.", available: true },
            { text: "Ad-free experience.", available: true },
            { text: "Access to exclusive Pro Plan community forums.", available: true },
            { text: "Early access to new courses and updates.", available: true }
        ] }
    }
    };


const faqsCard = [
    {
        id : 1,
        title : "Can I enroll in multiple courses at once?",
        description: "Absolutely! You can enroll in multiple courses simultaneously and access them at your convenience.",
        link_text : "Enrollment Process for Different Courses"
    },
    {
        id : 2,
        title : "What kind of support can I expect from instructors?",
        description: "Absolutely! You can enroll in multiple courses simultaneously and access them at your convenience.",
        link_text : "Enrollment Process for Different Courses"
    },
    {
        id : 3,
        title : "Are the courses self-paced or do they have specific start and end dates?",
        description: "Absolutely! You can enroll in multiple courses simultaneously and access them at your convenience.",
        link_text : "Enrollment Process for Different Courses"
    },
    {
        id : 4,
        title : "Are there any prerequisites for the courses?",
        description: "Absolutely! You can enroll in multiple courses simultaneously and access them at your convenience.",
        link_text : "Enrollment Process for Different Courses"
    },
    {
        id : 5,
        title : "Can I download the course materials for offline access?",
        description: "Absolutely! You can enroll in multiple courses simultaneously and access them at your convenience.",
        link_text : "Enrollment Process for Different Courses"
    }
];

const achievements = [
    {
        id: 1,
        title: "Trusted by Thousands",
        description: "We have successfully served thousands of students, helping them unlock their potential and achieve their career goals.",
        icon:AchievementIcon1
    },
    {
        id: 2,
        title: "Award-Winning Courses",
        description: "Our courses have received recognition and accolades in the industry for their quality, depth of content, and effective teaching methodologies.",
        icon:AchievementIcon2
    },
    {
        id: 3,
        title: "Positive Student Feedback",
        description: "We take pride in the positive feedback we receive from our students, who appreciate the practicality and relevance of our course materials.",
        icon:AchievementIcon3
    },
    {
        id: 4,
        title: "Industry Partnerships",
        description: "We have established strong partnerships with industry leaders, enabling us to provide our students with access to the latest tools and technologies",
        icon:AchievementIcon4
    },
];

const ourGoals = [
    {
        id: 1,
        title: "Provide Practical Skills",
        description: "We focus on delivering practical skills that are relevant to the current industry demands. Our courses are designed to equip learners with the knowledge and tools needed to excel in their chosen field.",
        icon:GoalsIcon1
    },
    {
        id: 2,
        title: "Foster Creative Problem-Solving",
        description: "We encourage creative thinking and problem-solving abilities, allowing our students to tackle real-world challenges with confidence and innovation.",
        icon:GoalsIcon2
    },
    {
        id: 3,
        title: "Promote Collaboration and Community",
        description: "We believe in the power of collaboration and peer learning. Our platform fosters a supportive and inclusive community where learners can connect, share insights, and grow together.",
        icon:GoalsIcon3
    },
    {
        id: 4,
        title: "Stay Ahead of the Curve",
        description: "The digital landscape is constantly evolving, and we strive to stay at the forefront of industry trends. We regularly update our course content to ensure our students receive the latest knowledge and skills.",
        icon:GoalsIcon4
    },
];

export default {homeCourseCard , testimonials , benefitCard , priceCard , faqsCard , achievements , ourGoals} 