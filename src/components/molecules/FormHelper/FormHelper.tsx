import {StyleSheet, Text, View} from 'react-native';
import React, {FC, useCallback, useMemo, useState} from 'react';
import {FormHelperProps} from './FormHelper.types';
import {ErrorMessage, Field, FieldProps, Formik} from 'formik';
import {IFormData} from '../../../types';
import * as yup from 'yup';

const FormHelper: FC<FormHelperProps> = ({
  formStructure,
  initValues,
  onSubmit,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const initData: IFormData = useMemo(() => {
    if (initValues) {
      return initValues;
    } else {
      const data = formStructure.components.reduce((data, component) => {
        if (component.type != 'button' && component.type != 'submit') {
          return {
            ...data,
            [component.name]: '',
          };
        } else {
          return {
            ...data,
          };
        }
      }, {});
      return data;
    }
  }, [initValues, formStructure.components]);

  const validationSchema = useMemo(
    () =>
      formStructure.components.reduce(
        (schema, component) => ({
          ...schema,
          [component.name]: component.validation,
        }),
        {},
      ),
    [formStructure.components],
  );

  const yupValidationSchema = useMemo(
    () => yup.object().shape(validationSchema),
    [validationSchema],
  );

  const onSubmitHandler = useCallback(
    async (data: IFormData) => {
      if (onSubmit) {
        try {
          setIsLoading(true);
          await onSubmit(data);
          setIsLoading(false);
        } finally {
          setIsLoading(false);
        }
      }
    },
    [onSubmit],
  );

  const renderForm = useCallback((handleSubmit: any) => {
    return <></>;
  }, []);

  return (
    <Formik
      initialValues={initData}
      onSubmit={onSubmitHandler}
      validationSchema={yupValidationSchema}
      validateOnBlur={true}>
      {({handleSubmit}) => (
        <View
          style={{
            marginVertical: 20,
          }}>
          {renderForm(handleSubmit)}
        </View>
      )}
    </Formik>
  );
};

export default FormHelper;

const styles = StyleSheet.create({});
