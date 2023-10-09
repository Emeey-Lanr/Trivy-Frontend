import React, { useEffect, useContext, useState } from 'react'
import CreateModal from "./CreateModal";
import DashbarNav from "./DashbarNav";
import Sidebar from "./Sidebar";
import { appContext } from '../App';
import SideBarBack from "./SideBarBack";
import { SlCamera } from 'react-icons/sl';
import axios from 'axios';
import AlertModal from './AlertModal';
import noimg from "../Images/noImage.png"
const Setting = () => {
    const {
      adminId,
       adminOrganizationUserName,
        adminImage,
        adminEmail,
      adminEndPoint,
      dashboardFuction,
      setAlertModalStatus,
      setAlertMessage,
      setSideBarBoxShadow,
      setShowCreateModal,
       setShowSidebar,
      setCurrentSet,
    } = useContext(appContext);
    const [spin, setSpin] = useState("")
    useEffect(() => {
        setSideBarBoxShadow(5);
      setShowCreateModal(false);
       setShowSidebar("hidden")
    }, []);
    const alertModalMessage = (a, b, c, d) => {
         setAlertModalStatus(a);
         setAlertMessage(b);
        setTimeout(() => {
            setAlertModalStatus(c)
             setAlertMessage(d)
         },1000);
    }
const uploadImageEndPoint = `${adminEndPoint}/settingImage`;
    const uploadImage = (e) => {
     
        let imageUpload = new FileReader()
        imageUpload.readAsDataURL(e.target.files[0]);
        imageUpload.onload = () => {
            if (adminId === "") {
               alertModalMessage(true, "Reload Page to Upload", false, "")
            } else {
                setSpin("spin")
                axios
                  .post(uploadImageEndPoint, {
                    imageUrl: imageUpload.result,
                    adminId: adminId,
                  })
                  .then((result) => {
                      if (result.data.status) {
                          setSpin("")
                          alertModalMessage(
                            true,
                            "Image uploaded",
                            false,
                            ""
                          );
                      dashboardFuction();
                      } else {
                          setSpin("")
                       alertModalMessage(true, result.data.message, false, "");
                    }
                  });
           }
        
       };
    }
  return (
    <>
      <div className="w-100">
        <div className="w-10p bg-dashback-100">
          <div className="w-8p mx-auto mt-12 py-3 createmodal:w-10p">
            <div
              className="w-13 h-13 mx-auto border-2 border-green-like-100"
              style={{ borderRadius: "100px" }}
            >
              <div className="w-13 h-13 flex justify-center items-center">
                <img
                  src={adminImage === "" ? noimg : adminImage}
                  className="h-12"
                  alt=""
                  style={{ borderRadius: "100px", width: "90px" }}
                />
              </div>

              <div className="w-10p flex justify-end">
                <label id="htm">
                  <SlCamera
                    className={`text-green-like-100 text-3xl shadow-lg ${spin}`}
                    style={{ marginTop: "-20px", marginRight: "19px" }}
                  />
                  <input
                    type="file"
                    id="htm"
                    onChange={(e) => uploadImage(e)}
                    hidden
                  />
                </label>
              </div>
            </div>
            <div
              className="w-6p mx-auto bg-white mt-4 setting:w-10p"
              style={{ height: "500px" }}
            >
              <div className="w-8p mx-auto py-4">
                <p className="py-1 text-l">Email</p>
                <input
                  type="text"
                  disabled={true}
                  className="w-10p h-6 border border-inputLine rounded-sideicon"
                  value={`${adminEmail}`}
                />
              </div>
              <div className="w-8p mx-auto py-4">
                <p className="py-1 text-l">Organization Name</p>
                <input
                  type="text"
                  disabled={true}
                  className="w-10p h-6 border border-inputLine rounded-sideicon"
                  value={adminOrganizationUserName}
                />
              </div>
            </div>
          </div>
        </div>
        <CreateModal />
        <SideBarBack />
        <Sidebar />
        <DashbarNav />
        <AlertModal />
      </div>
    </>
  );
}

export default Setting