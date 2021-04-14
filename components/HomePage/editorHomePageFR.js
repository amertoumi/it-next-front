import React, { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {
  API_HOST,
  API_HOMEPAGE_CONTENT_PATH,
  API_EDIT_HOMEPAGE_CONTENT_PATH,
} from "../../API";
import { Axios } from "../../services/authApi";
import { Button } from "reactstrap";

function EditorHomePageFR() {
  const [presentation, setPresentation] = useState();
  const [recruiter, setRecruiter] = useState();
  const [recruiterBackground, setBackgroundRecruiter] = useState();
  const [clouds, setClouds] = useState();
  const [mission1, setMission1] = useState();
  const [mission2, setMission2] = useState();
  const [whyIt, setWhyIt] = useState();
  const [client, setClient] = useState();
  const [talent, setTalent] = useState();
  const [inspirnaute, setInspirnaute] = useState();
  const [footer, setFooter] = useState();
  const [content, setContent] = useState();

  //Get all Content from DB
  function getContent() {
    var URL = API_HOST + API_HOMEPAGE_CONTENT_PATH;
    Axios.get(URL)
      .then((response) => setContent(response.data))

      .catch((error) => console.log(error.message));
  }

  //Array filter FR content
  const FRContent = [];
  content?.map((cnt, index) => {
    if (cnt.language == "FR") {
      FRContent.push(cnt);
    }
  });

  // Add New Content Home Page
  const AddData = () => {
    var url = API_HOST + API_EDIT_HOMEPAGE_CONTENT_PATH + "FR";
    var formdata = new FormData();
    formdata.append("sectionPresentation", presentation);
    formdata.append("sectionRecruiter", recruiter);
    formdata.append("sectionRecruiterBackground", recruiterBackground);
    formdata.append("sectionClouds", clouds);
    formdata.append("sectionMission1", mission1);
    formdata.append("sectionMission2", mission2);
    formdata.append("sectionWhyIt", whyIt);
    formdata.append("sectionClient", client);
    formdata.append("sectionTalent", talent);
    formdata.append("sectionInspirenaute", inspirnaute);
    formdata.append("sectionFooter", footer);

    Axios.post(url, formdata)
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getContent();
  }, []);

  return (
    <div className="App">
      <div className="slogan_fr">
        <div>
          <h5>Presentation Section </h5>
          <Button
            variant="contained"
            color="primary"
            className="mb-2"
            size="small"
            onClick={AddData}
          >
            {" "}
            Save Change
          </Button>
        </div>
        <div>
          <CKEditor
            editor={ClassicEditor}
            data={FRContent[0]?.sectionPresentation}
            onReady={(editor) => {}}
            onChange={(event, editor) => {
              const data = editor.getData();
              setPresentation(data);
            }}
            onBlur={(event, editor) => {
              //console.log( 'Blur.', editor );
            }}
            onFocus={(event, editor) => {
              //console.log( 'Focus.', editor );
            }}
          />
        </div>
      </div>

      <div className="Embaucher_fr">
        <div>
          <h5>Recruiter Section</h5>
        </div>
        <div>
          <CKEditor
            editor={ClassicEditor}
            data={FRContent[0]?.sectionRecruiter}
            onReady={(editor) => {}}
            onChange={(event, editor) => {
              const data = editor.getData();
              setRecruiter(data);
            }}
            onBlur={(event, editor) => {}}
            onFocus={(event, editor) => {}}
          />
        </div>
      </div>
      <div className="Bg-recruiter_fr">
        <div>
          <h5>Background Recruiter Section</h5>
        </div>
        <div>
          <CKEditor
            editor={ClassicEditor}
            data={FRContent[0]?.sectionRecruiterBackground}
            onReady={(editor) => {}}
            onChange={(event, editor) => {
              const data = editor.getData();
              setBackgroundRecruiter(data);
            }}
            onBlur={(event, editor) => {}}
            onFocus={(event, editor) => {}}
          />
        </div>
      </div>
      <div className=" embaucher_fr">
        <div>
          <h5>Clouds Section</h5>
        </div>
        <div>
          <CKEditor
            editor={ClassicEditor}
            data={FRContent[0]?.sectionClouds}
            onReady={(editor) => {}}
            onChange={(event, editor) => {
              const data = editor.getData();
              setClouds(data);
            }}
            onBlur={(event, editor) => {}}
            onFocus={(event, editor) => {}}
          />
        </div>
      </div>

      <div className="mission1_fr">
        <div>
          <h5>Mission 1 Section </h5>
        </div>
        <div>
          <CKEditor
            editor={ClassicEditor}
            data={FRContent[0]?.sectionMission1}
            onReady={(editor) => {}}
            onChange={(event, editor) => {
              const data = editor.getData();
              setMission1(data);
            }}
            onBlur={(event, editor) => {}}
            onFocus={(event, editor) => {}}
          />
        </div>
      </div>
      <div className="mission2_fr">
        <div>
          <h5>Mission 2 Section </h5>
        </div>
        <div>
          <CKEditor
            editor={ClassicEditor}
            data={FRContent[0]?.sectionMission2}
            onReady={(editor) => {}}
            onChange={(event, editor) => {
              const data = editor.getData();
              setMission2(data);
            }}
            onBlur={(event, editor) => {}}
            onFocus={(event, editor) => {}}
          />
        </div>
      </div>
      <div className="Why IT_fr">
        <div>
          <h5>Why Inspire Talent Section</h5>
        </div>
        <div>
          <CKEditor
            editor={ClassicEditor}
            data={FRContent[0]?.sectionWhyIt}
            onReady={(editor) => {}}
            onChange={(event, editor) => {
              const data = editor.getData();
              setWhyIt(data);
            }}
            onBlur={(event, editor) => {}}
            onFocus={(event, editor) => {}}
          />
        </div>
      </div>
      <div className="Client _fr">
        <div>
          <h5>Client Section</h5>
        </div>
        <div>
          <CKEditor
            editor={ClassicEditor}
            data={FRContent[0]?.sectionClient}
            onReady={(editor) => {}}
            onChange={(event, editor) => {
              const data = editor.getData();
              setClient(data);
            }}
            onBlur={(event, editor) => {}}
            onFocus={(event, editor) => {}}
          />
        </div>
      </div>

      <div className="Talents_fr">
        <div>
          <h5>Talent Section</h5>
        </div>
        <div>
          <CKEditor
            editor={ClassicEditor}
            data={FRContent[0]?.sectionTalent}
            onReady={(editor) => {}}
            onChange={(event, editor) => {
              const data = editor.getData();
              setTalent(data);
            }}
            onBlur={(event, editor) => {}}
            onFocus={(event, editor) => {}}
          />
        </div>
      </div>
      <div className="Inspiranute">
        <div>
          <h5>Inspiranute Section </h5>
        </div>
        <div>
          <CKEditor
            editor={ClassicEditor}
            data={FRContent[0]?.sectionInspirenaute}
            onReady={(editor) => {}}
            onChange={(event, editor) => {
              const data = editor.getData();
              setInspirnaute(data);
            }}
            onBlur={(event, editor) => {}}
            onFocus={(event, editor) => {}}
          />
        </div>
      </div>
      <div className="Footer_fr">
        <div>
          <h5>Footer Section </h5>
        </div>
        <div>
          <CKEditor
            editor={ClassicEditor}
            data={FRContent[0]?.sectionFooter}
            onReady={(editor) => {}}
            onChange={(event, editor) => {
              const data = editor.getData();
              setFooter(data);
            }}
            onBlur={(event, editor) => {}}
            onFocus={(event, editor) => {}}
          />
        </div>
      </div>
    </div>
  );
}

export default EditorHomePageFR;
