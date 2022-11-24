import axios from "axios";
import {useState} from "react"

const ImageForm = () => {

  const [file, setFile] = useState()  
  const [progress, setProgress] = useState(0)  
  const submitHandler = async data => {

    //Post to students
    // ({
    //     ...data,
    //     avatarId: file.id,
    // })
  };
  const fileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("avatar", file);

    const res = await axios.post(
      "http://localhost:8080/api/v1/attachments",
      formData,
      {
        onUploadProgress: pr => {
            setProgress(Math.trunc(pr.loaded/ (pr.total/100)))
            console.log(pr);
        }
      }
    );

    setFile(res.data.data.newAttachment)
    setProgress(0)
  };
  return (
    <>
      <form onSubmit={submitHandler}>
        <div className="form-control">
          <label htmlFor="avatar" className="img-label">
            {file&& <img src={`http://localhost:8080/${file.name}`} />}
            {!file&&"Choose your image"}
            {progress>0&&` ${progress}%`}
          </label>
          <input
            className="img-input"
            type="file"
            id="avatar"
            onChange={fileHandler}
          />
        </div>
        <button>Save</button>
      </form>
    </>
  );
};

export default ImageForm;
