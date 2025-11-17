const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]

const courseList = document.getElementById('course-list');
const allButton = document.getElementById('all-button');
const cseButton = document.getElementById('cse-button');
const wddButton = document.getElementById('wdd-button');
const credits = document.getElementById('credits');

function getCourses(subject = "") {
    courseList.innerHTML = "";

    const filteredCourses = courses.filter((course) => subject === "" || course.subject === subject);

    courses.forEach((course, index) => {
        const li = document.createElement('li');

        li.dataset.index = index;

        li.textContent = `${course.subject} ${course.number}`;

        if (course.completed) {
            li.classList.add('completed');
        }

        courseList.appendChild(li);
    });

    credits.textContent = filteredCourses.reduce((accumulator, course) => accumulator + course.credits, 0);
};

getCourses();

allButton.addEventListener('click', () => getCourses());
cseButton.addEventListener('click', () => getCourses("CSE"));
wddButton.addEventListener('click', () => getCourses("WDD"));

const modal = document.getElementById('course-details');
const courseDiv = document.getElementById('course-list');

function displayCourseModal(course) {
    modal.innerHTML = '';
    modal.innerHTML = `
    <section id="title-bar">    
        <h2>${course.subject} ${course.number}</h2>
        <button id="closeBtn">×</button>
    </section>
    <h3>${course.title}</h3>
    <p>${course.credits} credits</p>
    <p>Certificate: ${course.certificate}</p>
    <p>${course.description}</p>
    <p>Technology: ${course.technology.join(', ')}</p>
  `;
    modal.showModal();

    closeBtn.addEventListener("click", () => {
        modal.close();
    });
}

courseDiv.addEventListener('click', e => {
    const index = e.target.dataset.index;
    displayCourseModal(courses[index]);
})