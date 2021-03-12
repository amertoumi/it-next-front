//import LeftContentBlock from "./LeftContentBlock";
//import RightContentBlock from "./RightContentBlock";
import dynamic from 'next/dynamic'

const LeftContentBlock= dynamic(() => import('./LeftContentBlock'))
const RightContentBlock= dynamic(() => import('./RightContentBlock'))


const ContentBlock = (props) => {
  if (props.type === "left") return <LeftContentBlock {...props} />;
  if (props.type === "right") return <RightContentBlock {...props} />;
  return null;
};

export default ContentBlock;
