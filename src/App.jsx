
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import NavBar from "./Components/NavBar/NavBar";
// import BackToTop from "./Components/BackToTop/BackToTop";
// import Footer from "./Components/Footer/Footer";
// import Index from "./Pages/Index/Index";
// import Shipping from "./Pages/Shipping/Shipping";
// import Support from "./Pages/Suppport/Support";
// import Locations from "./Pages/Locations/Locations";
// import Login from "./Pages/Login/Login";
// import "./App.css";

// // Main layout (with NavBar, Footer, BackToTop)
// const MainLayout = ({ children }) => (
//   <>
//     <NavBar />
//     {children}
//     <Footer />
//     <BackToTop />
//   </>
// );

// // Auth layout (no NavBar, Footer, BackToTop)
// const AuthLayout = ({ children }) => <>{children}</>;

// function App() {
//   return (
//     <Routes>
//       {/* Routes with MainLayout */}
//       <Route
//         path="/"
//         element={
//           <MainLayout>
//             <Index />
//           </MainLayout>
//         }
//       />
//       <Route
//         path="/shipping"
//         element={
//           <MainLayout>
//             <Shipping />
//           </MainLayout>
//         }
//       />
//       <Route
//         path="/locations"
//         element={
//           <MainLayout>
//             <Locations />
//           </MainLayout>
//         }
//       />
//       <Route
//         path="/support"
//         element={
//           <MainLayout>
//             <Support />
//           </MainLayout>
//         }
//       />

//       {/* Routes with AuthLayout */}
//       <Route
//         path="/login"
//         element={
//           <AuthLayout>
//             <Login />
//           </AuthLayout>
//         }
//       />
//     </Routes>
//   );
// }

// export default App;




// import { BrowserRouter, Routes, Route } from "react-router";
// import NavBar from "./Components/NavBar/NavBar";
// import BackToTop from "./Components/BackToTop/BackToTop"
// import Footer from "./Components/Footer/Footer";
// import Index from "./Pages/Index/Index";
// import Shipping from "./Pages/Shipping/Shipping";
// import Support from "./Pages/Suppport/Support";
// import Locations from "./Pages/Locations/Locations";
// import './App.css'
// import Login from "./Pages/Login/Login";



// function App() {


//   return (
//     <>
//       <NavBar />
//       {/* <ScrollToTop /> */}
//       <Routes>
//         <Route path="/" element={<Index />} />
//         <Route path="/shipping" element={<Shipping />} />
//         <Route path="/locations" element={<Locations />} />
//         <Route path="/support" element={<Support />} />
//         <Route path="/login" element={<Login />} />
//       </Routes>
//       <Footer />
//       <BackToTop />
//     </>
//   )
// }

// export default App








import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import BackToTop from "./Components/BackToTop/BackToTop";
import Footer from "./Components/Footer/Footer";
import Index from "./Pages/Index/Index";
import Shipping from "./Pages/Shipping/Shipping";
import Support from "./Pages/Suppport/Support";
import Locations from "./Pages/Locations/Locations";
import Login from "./Pages/Login/Login";
import "./App.css";

function App() {
  const location = useLocation();

  // Hide NavBar, Footer, BackToTop on login page
  const hideNavAndFooter = location.pathname === "/login";

  return (
    <>
      {!hideNavAndFooter && <NavBar />}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/support" element={<Support />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      {!hideNavAndFooter && <Footer />}
      {!hideNavAndFooter && <BackToTop />}
    </>
  );
}

export default App;



