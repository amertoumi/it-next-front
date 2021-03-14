import React from 'react';
import { UncontrolledCarousel } from 'reactstrap';
import img1 from '../../assets/img/img1.png';
import img2 from '../../assets/img/img2.jpg';
import img3 from '../../assets/img/img3.png';
import img4 from '../../assets/img/img4.png';


const items = [
  {
    src: img1,
    altText: 'Slide 1',
    caption: 'Slide 1',
    header: 'Slide 1 Header',
    key: '1'
  },
  {
    src: img2,
    altText: 'Slide 2',
    caption: 'Slide 2',
    header: 'Slide 2 Header',
    key: '2'
  },
  {
    src: img3,
    altText: 'Slide 3',
    caption: 'Slide 3',
    header: 'Slide 3 Header',
    key: '3'
  },
  {
    src: img4,
    altText: 'Slide 4',
    caption: 'Slide 4',
    header: 'Slide 4 Header',
    key: '4'
  }
];

const Example = () => <UncontrolledCarousel items={items} className="mt-5 mb-5"/>;

export default Example;