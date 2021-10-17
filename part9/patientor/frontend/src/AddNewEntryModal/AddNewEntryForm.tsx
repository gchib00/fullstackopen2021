import React, { useState, useEffect } from "react";
import { Grid, Button, Select } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField, SelectField, HealthCheckRatingOptions,NumberField } from "./FormField";
import { HealthCheckEntry, HealthCheckRating, HospitalEntry } from "../types";

interface Props {
  onSubmit: (values: Omit<HealthCheckEntry, 'id'> | Omit<HospitalEntry, 'id'>) => void;
  onCancel: () => void;
  type: string
}

const healthCheckRatingOptions: HealthCheckRatingOptions[] = [
  { value: 0, label: "Healthy" },
  { value: 1, label: "LowRisk" },
  { value: 2, label: "HighRisk" },
  { value: 3, label: "CriticalRisk" }
];

export const AddNewEntryForm = ({ onSubmit, onCancel, type } : Props ) => {

  console.log('type=', type)

  switch(type){
    case('HealthCheck'): {
      return (
        <Formik
          enableReinitialize
          initialValues={{
            type: type,
            description: '',
            date: '',
            specialist: '',
            diagnosisCodes: [],
            healthCheckRating: 0
          }}
          onSubmit={onSubmit}
          validate={values => {
            console.log('values inside healthcheck = ', values)
            const requiredError = "Field is required";
            const errors: { [field: string]: string } = {};
            if (!values.description) {
              errors.description = requiredError;
            }
            if (!values.date) {
              errors.date = requiredError;
            }
            if (!values.specialist) {
              errors.specialist = requiredError;
            }
            //@ts-ignore // Otherwise it throws wrong error due to bug (TS doesn't recognize 'enableReinitialize' property of Formik)
            if (!values.healthCheckRating) {
              errors.healthCheckRating = requiredError;
            }
            return errors;
          }}
        >
          {({ isValid, dirty }) => {
            return (
              <Form className="form ui">
                <Field
                  label="Description"
                  placeholder="Description"
                  name="description"
                  component={TextField}
                />
                <Field
                  label="Date"
                  placeholder="YYYY-MM-DD"
                  name="date"
                  component={TextField}
                />
                <Field
                  label="Specialist"
                  placeholder="Specialist"
                  name="specialist"
                  component={TextField}
                />
                <Field
                  label="healthCheckRating"
                  name="healthCheckRating"
                  component={NumberField}
                  min={0}
                  max={3}
                />
                <Grid>
                  <Grid.Column floated="left" width={5}>
                    <Button type="button" onClick={onCancel} color="red">
                      Cancel
                    </Button>
                  </Grid.Column>
                  <Grid.Column floated="right" width={5}>
                    <Button
                      type="submit"
                      floated="right"
                      color="green"
                      disabled={!dirty || !isValid}
                    >
                      Add
                    </Button>
                  </Grid.Column>
                </Grid>
              </Form>
            );
          }}
        </Formik>
      );
    }
    case('Hospital'):{
      return (
        <Formik
          enableReinitialize
          initialValues={{
            type: type,
            description: '',
            date: '',
            specialist: '',
            diagnosisCodes: [],
            discharge: {
              date: '',
              criteria: ''
            }
          }}
          onSubmit={onSubmit}
          validate={values => {
            console.log('values inside hopsital = ', values)
            const requiredError = "Field is required";
            const errors: { [field: string]: string } = {};
            if (!values.description) {
              errors.description = requiredError;
            }
            if (!values.date) {
              errors.date = requiredError;
            }
            if (!values.specialist) {
              errors.specialist = requiredError;
            }
            if ((!values.discharge.criteria) || (!values.discharge.date) )
            return errors;
          }}
        >
          {({ isValid, dirty }) => {
            return (
              <Form className="form ui">
                <Field
                  label="Description"
                  placeholder="Description"
                  name="description"
                  component={TextField}
                />
                <Field
                  label="Date"
                  placeholder="YYYY-MM-DD"
                  name="date"
                  component={TextField}
                />
                <Field
                  label="Specialist"
                  placeholder="Specialist"
                  name="specialist"
                  component={TextField}
                />
                <p>Discharge:</p>
                <Field
                  label="dischargeName"
                  placeholder="Discharge name"
                  name="discharge.criteria"
                  component={TextField}
                />
                <Field
                  label="dischargeDate"
                  placeholder="Discharge date"
                  name="discharge.date"
                  component={TextField}
                />
                <Grid>
                  <Grid.Column floated="left" width={5}>
                    <Button type="button" onClick={onCancel} color="red">
                      Cancel
                    </Button>
                  </Grid.Column>
                  <Grid.Column floated="right" width={5}>
                    <Button
                      type="submit"
                      floated="right"
                      color="green"
                      disabled={!dirty || !isValid}
                    >
                      Add
                    </Button>
                  </Grid.Column>
                </Grid>
              </Form>
            );
          }}
        </Formik>
      );
    }
  }
  return <p>test</p>
};

export default AddNewEntryForm;
