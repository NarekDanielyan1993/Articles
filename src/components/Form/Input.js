import React from 'react';


import './Input.css';

const input = props => (
    <div className="inputElement">
        {props.label && <label htmlFor={props.id}>{props.label}</label>}
        {props.control === 'input' && (
          <input className="input"
            type={props.type}
            id={props.id}
            required={props.required}
            value={props.value}
            placeholder={props.placeholder}
            onChange={props.onChange}
          />
        )}
        {props.control === 'textarea' && (
          <textarea
            id={props.id}
            rows={props.rows}
            required={props.required}
            value={props.value}
            onChange={props.onChange}
          />
        )}
    </div>
);

export default input;
