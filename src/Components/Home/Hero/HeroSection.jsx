import React, { useEffect, useRef, useState, Suspense, lazy } from "react";
import "./HeroSection.css";
import { Link } from "react-router-dom";
// Defer heavy three.js modules
const Canvas = lazy(() => import("@react-three/fiber").then(m => ({ default: m.Canvas })));
const OrbitControls = lazy(() => import("@react-three/drei").then(m => ({ default: m.OrbitControls })));
const Model = lazy(() => import("../../Model/Model").then(m => ({ default: m.Model })));

const HeroSection = () => {
  const [tshirtColor, setTshirtColor] = useState("red");
  const [isInView, setIsInView] = useState(false);
  const canvasHolderRef = useRef(null);

  useEffect(() => {
    const el = canvasHolderRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      { root: null, threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const changeColor = (color) => {
    setTshirtColor(color);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="heroMain">
        <div className="sectionleft">
          <p>New Trend</p>
          <h1>Summer Sale Stylish</h1>
          <span>Limited Time Offer - Up to 60% off & Free Shipping</span>
          <div className="heroLink">
            <Link to="/shop" onClick={scrollToTop}>
              <h5>Discover More</h5>
            </Link>
          </div>
        </div>
        <div className="sectionright" ref={canvasHolderRef}>
          <Suspense fallback={<div style={{ height: 400 }} />}> 
            {isInView && (
              <Canvas className="canvasModel" camera={{ position: [0, 5, 15], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={2.5} color={"white"} />
                <OrbitControls enableZoom={false} enablePan={false} minAzimuthAngle={-Infinity} maxAzimuthAngle={Infinity} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />
                <Model color={tshirtColor} />
              </Canvas>
            )}
          </Suspense>
          <div className="heroColorBtn">
            <button onClick={() => changeColor("#353933")} style={{ backgroundColor: "#353933" }}></button>
            <button onClick={() => changeColor("#EFBD4E")} style={{ backgroundColor: "#EFBD4E" }}></button>
            <button onClick={() => changeColor("#726DE7")} style={{ backgroundColor: "#726DE7" }}></button>
            <button onClick={() => changeColor("red")} style={{ backgroundColor: "red" }}></button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
