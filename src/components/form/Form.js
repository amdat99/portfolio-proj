import React from 'react';

function Form(props) {
    return (
        <div className="form-container">
        <input className="form-input" onChange={handleChange} {...otherProps} />
        {
            label?
            <label 
            className={`${otherProps.value.length ? 'shrink' : ''} form-input-label`}>
                {label}
            </label>
            :null
        }
    </div>
);
}
    );
}

export default Form;