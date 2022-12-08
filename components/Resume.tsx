import React from 'react'
import ResumeTopic from './ResumeTopic'

export default function Resume() {
  return (
    <div>
      <ResumeTopic
        title="G2i"
        subTitle="Mobile and FrontEnd Developer"
        dateInit="Nov, 2020"
        location="Remote"
        description={[
          'Working as a developer in G2i, hired for be part of the small group of developers that work as freelancers working for companies around the world',
          'Hired for primarily work as a ReactNative/React Developer',
          'Started my first contract working along with a canadian company for built an mobile application.',
          'Knowledge in ReactNative/React/Redux/Node.js',
        ]}
        tech={['react', 'react-native', 'redux', 'context-api']}
      />
      <ResumeTopic
        title="Globalsys - Solutions in Technology"
        subTitle="Mobile Developer"
        dateInit="Sep, 2020"
        location="Remote"
        description={[
          'Hired as a outsourcing developer, hire primarily work on a Uber-like application. But now hired for the own company Globalsys to work with them.',
          'Experience with React Native, Android and iOS, knowledge about bridges. Notions with animations, UI and UX are also fit to this job.',
        ]}
        tech={['react', 'react-native', 'redux', 'context-api']}
      />
      <ResumeTopic
        title="Skilopay"
        subTitle="Mobile Developer"
        dateInit="Jan, 2020"
        dateEnd="Sep, 2020"
        location="Remote"
        description={[
          'Joined a small group of developers, hired to develop in high scale an Financial Application.',
          'Our main goal at the time was to refine all products with in the app and delivery features.',
        ]}
        tech={['react', 'react-native', 'graphql', 'apollo', 'context-api']}
      />
      <ResumeTopic
        title="Multicast - IOT"
        subTitle="Front-End Developer"
        dateInit="Apr, 2020"
        dateEnd="Jun, 2020"
        location="Remote"
        description={[
          'Development of a new solution to this company that I previously work with, with React again.',
          'Hired for development of an web solution that turn to be a product.',
          'Understanding about React, Redux, Thunk, Design UI and Clean Architecture was important.',
        ]}
        tech={['react', 'redux', 'ui/ux', 'clean-architecture']}
      />
      <ResumeTopic
        title="Paytime"
        subTitle="Front-End Developer"
        dateInit="Oct, 2019"
        dateEnd="Aug, 2020"
        location="Vitória, ES"
        description={[
          'Development of a dashboard with the object of improving the UX linked with a WordPress page.',
          'Development of private projects using React.',
          'Understanding of Nodejs and Adonis we`re good fit to improve development and keep in touch with the backend team.',
          'Use of technologies as HTML/CSS, React, React Native.',
          'Knowledge and notions on Designing UI/UX solutions to help the design team.',
        ]}
        tech={['react', 'react-native', 'nodejs', 'adonis', 'ui/ux']}
      />
      <ResumeTopic
        title="Start Tech - Solutions in Technology"
        subTitle="Fullstack Developer | Internship"
        dateInit="Aug, 2019"
        dateEnd="Oct, 2019"
        location="Vitória, ES"
        description={[
          'Hired for been a internship responsible for develop and maintain applications that solved business problems of the company.',
          'Hired for primarily work with React Native, but my knowledge in Nodejs help to get me a position as fullstack developer in the application.',
          'Knowledge in React Native and Nodejs.',
        ]}
        tech={['react', 'react-native', 'redux', 'javascript', 'nodejs']}
      />
      <ResumeTopic
        title="Multicast - IOT"
        subTitle="Front-End Developer | Freelancer"
        dateInit="May, 2019"
        dateEnd="Jan, 2020"
        location="Vitória, ES"
        description={[
          'Hired for helping another developer to refactor all the UI of React-MD to Material-UI.',
          'Besides the refactor, we needed to develop a PWA using React.',
          'Knowledge in React, Redux, RxJs and Java',
        ]}
        tech={['react', 'redux', 'rxjs', 'java']}
      />
    </div>
  )
}
