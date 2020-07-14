import React, { useState, useEffect } from "react";
import classes from "../ModalContent.module.css";
import { Input } from "@material-ui/core";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { isEmpty } from "lodash";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
function ModalContent() {
  const phoneRegExp = /^[09\d{9}]{10}$/;
  const usernameRegExp = /^[a-z0-9_-]{3,16}$/;
  const history = useHistory();
  const [state, setState] = useState({
    phone: "",
    password: ""
  });
  // useEffect(() => {
  //   console.log("component mount");
  //   return () => {
  //     console.log("unmont");
  //   };
  // }, [state]);

  const formik = useFormik({
    initialValues: {
      phone: "",
      username: ""
    },
    validationSchema: Yup.object({
      phone: Yup.string()
        .matches(phoneRegExp, "شماره وارد شده معتبر نیست")
        .required("فیلد  الزامی "),
      username: Yup.string()
        .max(15, "نام کاربری حداکثر شامل 15 کارکتر باشد")
        .matches(usernameRegExp, "نام کاربری صحیح نمی باشد")
        .required("فیلد الزامی")
    }),

    onSubmit: values => {
      history.push("/user");
      // alert(JSON.stringify(values, null, 2));
    }
  });
  return (
    <div className={classes.paper}>
      <h4 className={classes.Title}>اطلاعات خود را وارد کنید</h4>
      <form onSubmit={formik.handleSubmit}>
        <div className={classes.form}>
          <Input
            type="number"
            name="phone"
            onChange={formik.handleChange}
            value={formik.values.phone}
            disableUnderline={true}
            placeholder="شماره همرا خود را وارد نمایید"
            className={classes.inputPhone}
          />
          <i className={`fas fa-phone-square-alt ${classes.icon}`}></i>
        </div>
        {formik.touched.phone && formik.errors.phone ? (
          <div className={classes.error}>
            {formik.errors.phone}
            <i className="fas fa-exclamation-circle"></i>
          </div>
        ) : null}
        <div className={classes.form}>
          <Input
            name="username"
            onChange={formik.handleChange}
            value={formik.values.username}
            disableUnderline={true}
            placeholder="نام و نام خوانوادگی"
            className={classes.inputPhone}
          />
          <i className={`fas fa-user ${classes.icon}`}></i>
        </div>
        {formik.touched.username && formik.errors.username ? (
          <div className={classes.error}>
            {formik.errors.username}
            <i className="fas fa-exclamation-circle"></i>
          </div>
        ) : null}
        <Button variant="contained" type="submit" className={classes.SubmitBtn}>
          ورود
        </Button>
      </form>
    </div>
  );
}

export default ModalContent;
