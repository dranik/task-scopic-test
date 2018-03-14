import { SingleDatePicker } from 'react-dates';
import React, { Component } from 'react';
import _ from 'lodash';

export const SingleField = (field) => {
  const renderInnerElement = (field) => {
    switch (field.type) {
      case "textarea":
        return(
          <textarea
            className="form-control"
            {...field.input}
          />
        )
      case "date":
        return(
          <SingleDatePicker
              {..._.omit(field.input, ['name', 'onBlur', 'onChange', 'onDragStart', 'onDrop', 'onFocus', 'value'])}
            date={field.input.value}
            onDateChange={date => field.input.onChange(date)}
            focused = {field.focused}
            onFocusChange={f => field.onFocusChange(f)}
            isOutsideRange={(day) => false}
          />
        )
      default:
        return (
          <input
            className="form-control"
            type={field.type}
            {...field.input}
          />
        )
    }
  };
  const className = `form-group ${field.meta.touched && field.meta.error ? 'has-danger' : ''}`
  return (
    <div className={className}>
      <label>{field.label}</label>
      {(field.type=='date') ? (<br />) : ''}
      {renderInnerElement(field)}
      <div className="text-help">
        {field.meta.touched ? field.meta.error : ''}
      </div>
    </div>
  );
}
