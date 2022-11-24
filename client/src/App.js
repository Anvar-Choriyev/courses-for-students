import {Routes, Route} from "react-router-dom"
import Courses from "./pages/Courses/Courses";
import './App.css';
import Home from "./pages/Home/Home";
import CoursesAddEdit from "./pages/CoursesAddEdit/CoursesAddEdit";
import { ToastContainer } from "react-toastify";
import StudentsAddEdit from "./pages/StudentsAddEdit/StudentsAddEdit";
import Students from "./pages/Students/Students";
import CourseStudents from "./pages/courseStudents/CourseStudents";
import Login from "./pages/Login/Login";
import { useSelector } from "react-redux";
import Register from "./pages/Register/Register";
import Verification from "./pages/Verification";
import VerificationCheck from "./pages/VerificationCheck";
import Admins from "./pages/Admins/Admins";
import EditAdmin from "./pages/Admins/EditAdmin";

function App() {
  const isAuth = useSelector(st=>st.app.isAuth)
  return (
    <>
    <ToastContainer />
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/auth/login" element={<Login/>}/>
        <Route path="/auth/register" element={<Register/>}/>
        {isAuth&&<Route path="/courses" element={<Courses/>} />}
        {isAuth&&<Route path="/students" element={<Students/>} />}
        <Route path="/courses/:id" element={<CoursesAddEdit/>} />
        <Route path="/courses/:id/students" element={<CourseStudents/>}/>
        <Route path="/students/:id" element={<StudentsAddEdit/>} />
        <Route path="/auth/verify/:id" element={<Verification/>} />
        <Route path="/auth/email-verification/:id" element={<VerificationCheck/>} />
        <Route path="/users" element={<Admins/>}/>
        <Route path="/users/:id" element={<EditAdmin/>}/>
      </Routes>
    </div>
    </>
  );
}

export default App;
