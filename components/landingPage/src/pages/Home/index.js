import { lazy } from "react";

import IntroContent from "../../content/IntroContent.json";
import MiddleBlockContent from "../../content/MiddleBlockContent.json";
import AboutContent from "../../content/AboutContent.json";
import MissionContent from "../../content/MissionContent.json";
import ProductContent from "../../content/ProductContent.json";
import ContactContent from "../../content/ContactContent.json";
import dynamic from 'next/dynamic'

const Contact_From = dynamic(() => import('../../components/ContactForm'))
const Contact_Block = dynamic(() => import('../../components/ContentBlock'))
const Middle_Block = dynamic(() => import('../../components/MiddleBlock'))
const Container_Block = dynamic(()=>import('../../common/Container'))
const ScrollTo_Top = dynamic(()=>import('../../common/ScrollToTop'))

const ContactFrom = lazy(() => Contact_From);
const ContentBlock = lazy(() => Contact_Block);
const MiddleBlock = lazy(() => Middle_Block);
const Container = lazy(() => Container_Block);
const ScrollToTop = lazy(() => ScrollTo_Top);
//const ScrollToTop = lazy(() => import("../../common/ScrollToTop"));

const Home = () => {
  return (
    <Container>
      <ScrollToTop />
      <ContentBlock
        type="right"
        first="true"
        title={IntroContent.title}
        content={IntroContent.text}
        button={IntroContent.button}
        icon="developer.svg"
        id="intro"
      />
      <MiddleBlock
        title={MiddleBlockContent.title}
        content={MiddleBlockContent.text}
        button={MiddleBlockContent.button}
      />
      <ContentBlock
        type="left"
        title={AboutContent.title}
        content={AboutContent.text}
        section={AboutContent.section}
        icon="graphs.svg"
        id="about"
      />
      <ContentBlock
        type="right"
        title={MissionContent.title}
        content={MissionContent.text}
        icon="product-launch.svg"
        id="mission"
      />

      <ContentBlock
        type="left"
        title={ProductContent.title}
        content={ProductContent.text}
        icon="waving.svg"
        id="product"
      />
      <ContactFrom
        title={ContactContent.title}
        content={ContactContent.text}
        id="contact"
      />
    </Container>
  );
};

export default Home;
