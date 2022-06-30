import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axiosInstance from "../services/axios-instance";
import AlertMessage from "../components/AlertMessage";
import { useDispatch, useSelector } from "react-redux";
import { getSupervisors } from "../Redux/Actions/generalActions";
// import { toast } from "react-toastify";

export default function Notification() {
  const initialCheckBox = {
    isCheckedEmail: false,
    isCheckedPhone: false,
  };
  const [notificationView, setNotificationView] = useState(false);
  const [notificationText, setNotificationText] = useState("");
  const [checkboxOption, setCheckBoxOption] = useState(initialCheckBox);

  const dispatch = useDispatch();

  const { supervisors: supervisorList, isLoading } = useSelector(
    (state) => state.general
  );

  useEffect(() => {
    dispatch(getSupervisors());
  }, [dispatch]);

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    supervisor: Yup.string().required("Supervisor is required"),
    email: checkboxOption.isCheckedEmail
      ? Yup.string().email("invalid format")
      : Yup.string(),
    phoneNumber: checkboxOption.isCheckedPhone
      ? Yup.string().min(10, "Must be 10 number").max(10, "Must be 10 number")
      : Yup.number(),
  });

  const handleFormSubmitAPI = () => {
    if (checkboxOption.isCheckedEmail || checkboxOption.isCheckedPhone) {
      const data = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phoneNumber: values.phoneNumber,
        supervisor: values.supervisor,
      };

      axiosInstance.post("/submit", data).then(() => {
        setNotificationText("Notification has been sent !");
        setNotificationView(true);
        setCheckBoxOption(initialCheckBox);
        resetForm();
      }).catch((error) => {
        console.log(error);
      });
    } else {
      alert("Notified option is required !!");
    }
  };

  const {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    touched,
  } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      supervisor: "",
    },
    validationSchema,
    onSubmit: handleFormSubmitAPI
  });

  return isLoading ? (
    <div className="vh-100 d-flex align-items-center justify-content-center">
      <h4 className="text-center">Loading, Please Wait .......</h4>
    </div>
  ) : (
    <div className="vh-100 d-flex p-2 align-items-center">
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-sm-12 col-md-8 col-lg-7">
            <div className="row">
              <div className="col-12">
                {notificationView ? <AlertMessage title={notificationText} /> : null}
              </div>
            </div>
            <div className="card">
              <div className="card-header p-4 text-center">
                <h2 className="notification-title m-0">Notification Form</h2>
              </div>
              <div className="card-body notification-body">
                <form onSubmit={handleSubmit} className="row">
                  <div className="col-md-6 mb-3">
                    <div className="form-group">
                      <label className="form-label">First name</label>
                      <input
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.firstName}
                        name="firstName"
                        type="text"
                        className="form-control"
                      />
                      {errors.firstName && touched.firstName && (
                        <label className="error">{errors.firstName}</label>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="form-group">
                      <label className="form-label">Last name</label>
                      <input
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.lastName}
                        name="lastName"
                        type="text"
                        className="form-control"
                      />
                      {errors.lastName && touched.lastName && (
                        <label className="error">{errors.lastName}</label>
                      )}
                    </div>
                  </div>
                  <h6 className="mt-2">
                    How would you prefer to be notified ?
                  </h6>
                  <div className="col-md-6 mb-3">
                    <div className="form-group form-check">
                      <input
                        name="checkValue"
                        type="checkbox"
                        className="notification-chk form-check-input"
                        value={"EMAIL"}
                        checked={checkboxOption.isCheckedEmail}
                        id="emailChecked"
                        onChange={() =>
                          setCheckBoxOption({
                            isCheckedEmail: !checkboxOption.isCheckedEmail,
                            isCheckedPhone: checkboxOption.isCheckedPhone,
                          })
                        }
                      />
                      <label className="form-check-label" for="emailChecked">Email</label>

                    </div>
                    {checkboxOption.isCheckedEmail && (
                      <input
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="text"
                        name="email"
                        className="form-control mt-2"
                      />
                    )}
                    {errors.email && touched.email && (
                      <label className="error">{errors.email}</label>
                    )}
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="form-group form-check">
                      <input
                        name="checkValue"
                        type="checkbox"
                        className="notification-chk form-check-input"
                        value={"PHONE"}
                        id="phoneChecked"
                        checked={checkboxOption.isCheckedPhone}
                        onChange={() =>
                          setCheckBoxOption({
                            isCheckedPhone: !checkboxOption.isCheckedPhone,
                            isCheckedEmail: checkboxOption.isCheckedEmail,
                          })
                        }
                      />
                      <label className="form-check-label" for="phoneChecked">Phone number</label>
                    </div>
                    {checkboxOption.isCheckedPhone && (
                      <input
                        value={values.phoneNumber}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="number"
                        name="phoneNumber"
                        className="form-control mt-2"
                      />
                    )}
                    {errors.phoneNumber && touched.phoneNumber && (
                      <label className="error">{errors.phoneNumber}</label>
                    )}
                  </div>
                  <div className="col-12 mb-3">
                    <div className="form-group">
                      <label className="form-label">Supervisor</label>
                      <select
                        name="supervisor"
                        value={values.supervisor}
                        onChange={handleChange}
                        className="notification-select form-select"
                      >
                        <option value="" className="notification-option">
                          --- Select super visor ---
                        </option>
                        {supervisorList.map((supervisor, i) => {
                          return (
                            <option key={i} value={supervisor}>
                              {supervisor}
                            </option>
                          );
                        })}
                      </select>
                      {errors.supervisor && touched.supervisor && (
                        <label className="error">{errors.supervisor}</label>
                      )}
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="text-center">
                      <button className="btn btn-primary" type="submit">
                        SUBMIT
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
