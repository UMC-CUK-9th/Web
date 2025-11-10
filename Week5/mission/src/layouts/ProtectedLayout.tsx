

import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import MainLayout from "./MainLayout";
import HomeLayout from "./HomeLayout"; 
import AlertModal from "../components/AlertModal"; 
import { useEffect, useState } from "react"; 

const ProtectedLayout = () => {
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); 
  

  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {

    if (!accessToken) {
      setModalOpen(true);
    }
  }, [accessToken]); 


  const handleModalConfirm = () => {
    setModalOpen(false);

    navigate("/login", { replace: true, state: { from: location } });
  };


  if (accessToken) {

    return <MainLayout />;
  }

  if (isModalOpen) {
    return (
      <>
        <HomeLayout /> 

        <AlertModal onConfirm={handleModalConfirm} />
      </>
    );
  }

  return null;
};

export default ProtectedLayout;