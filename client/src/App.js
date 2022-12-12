import {Routes, Route} from "react-router-dom"
import Subjects from "./pages/Subjects/Subjects";
import './App.css';
import Home from "./pages/Home/Home";
import SubjectsAddEdit from "./pages/Subjects/SubjectsAddEdit";
import { ToastContainer } from "react-toastify";
import TeachersAddEdit from "./pages/Teachers/TeachersAddEdit";
import Teachers from "./pages/Teachers/Teachers";
import SubjectTeachers from "./pages/SubjectTeachers/SubjectTeachers";
import Login from "./pages/Login/Login";
import { useSelector } from "react-redux";
import Register from "./pages/Register/Register";
import Admins from "./pages/Admins/Admins";
import EditAdmin from "./pages/Admins/EditAdmin";
import Articles from "../src/pages/Articles/Articles";
import ArticlesAddEdit from "./pages/Articles/ArticlesAddEdit";
import Literatures from "./pages/Literatures/Literatures";
import LiteraturesAddEdit from "./pages/Literatures/LiteraturesAddEdit";
import Certificates from "./pages/Certificates/Certificates";
import CertificatesAddEdit from "./pages/Certificates/CertificatesAddEdit";

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
        {isAuth&&<Route path="/subjects" element={<Subjects/>} />}
        {isAuth&&<Route path="/teachers" element={<Teachers/>} />}
        {isAuth&&<Route path="/articles" element={<Articles/>} />}
        {isAuth&&<Route path="/literatures" element={<Literatures/>} />}
        {isAuth&&<Route path="/certificates" element={<Certificates/>} />}
        <Route path="/subjects/:id" element={<SubjectsAddEdit/>} />
        <Route path="/subjects/:id/teachers" element={<SubjectTeachers/>}/>
        <Route path="/teachers/:id" element={<TeachersAddEdit/>} />
        <Route path="/articles/:id" element={<ArticlesAddEdit/>} />
        <Route path="/literatures/:id" element={<LiteraturesAddEdit/>} />
        <Route path="/certificates/:id" element={<CertificatesAddEdit/>} />
        <Route path="/users" element={<Admins/>}/>
        <Route path="/users/:id" element={<EditAdmin/>}/>
      </Routes>
    </div>
    </>
  );
}

export default App;
