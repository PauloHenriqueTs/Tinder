import * as React from "react";
import { FieldProps } from "formik";
import Dropzone from "react-dropzone";

export const DropzoneField: React.SFC<FieldProps<any>> = ({
  field: { name, value },
  form: { setFieldValue, values, setValues }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  const pUrl = (value ? value.preview : null) || values.pictureUrl;
  return (
    <div>
      <Dropzone
        accept="image/jpeg, image/png"
        multiple={false}
        onDrop={([file]) => {
          setFieldValue(name, file);
        }}
        style={{
          backgroundImage: `url(${pUrl})`,
          width: "100%",
          height: "18em",
          border: "1px solid black",
          backgroundPosition: "center",
          backgroundrepeat: "no-repeat",
          backgroundSize: "cover",
          borderRadius: "0.9em",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center"
        }}
        {...props}
      >
        {!pUrl ? (
          <p style={{ marginLeft: "1em" }}>
            Drag 'n' drop some files here, or click to select files
          </p>
        ) : null}
      </Dropzone>
    </div>
  );
};
