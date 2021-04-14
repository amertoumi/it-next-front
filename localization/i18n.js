
import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import backend from "i18next-xhr-backend";
import { reactI18nextModule } from "react-i18next";
import axios from 'axios';
import navbarEN from '../Localization/locales/en/navbar.json';
import navbarFR from '../Localization/locales/fr/navbar.json';

function FetchContent(){
    const [content, setContent] = useState([]);
    var URL= API_HOST+ API_HOMEPAGE_CONTENT_PATH;
    axios.get(URL)
    .then((response) => setContent(response.data))

}

useEffect(()=> {
    FetchContent();
},[]);

//Array filter FR content
const FRContent = [];
content?.map((cnt) => {
  if (cnt.language == "FR") {
    FRContent.push(cnt);
  }
});
console.log(FRContent);

//Array filter EN content
const ENContent = [];
content?.map((cnt) => {
  if (cnt.language == "EN") {
    ENContent.push(cnt);
  }
});
console.log(ENContent);
// the translations 
const resources = {
    // Namspaces
    en: {
     presentation : "ENContent",
     sectionFooter : ENContent[0]?.sectionFooter
    },
    fr: {
     presentation : "FRContent",
     sectionFooter : FRContent[0]?.sectionFooter 
    },
 
};
console.log(ENContent)
i18n
  .use(detector)
  .use(backend)
  .use(reactI18nextModule) // passes i18n down to react-i18next
  .init({
    resources,
    //lng: "en",
    // Set default namespace
    defaultNS: "navbar",
    fallbackLng: "en", // use en if detected lng is not available

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;