import React from 'react';
import './Playground.css';
import cross from '../../images/cross.png';
import circle from '../../images/circle.png';

const Playground = ({ d, getOption }) => {

    const {position, value} = d;

    return (
        <div className="col-md-4 mb-3">
            <div onClick={() => getOption(position)} className="box p-3">
                {value == 'circle' && <img className="w-100 h-100" src={circle} alt="" />}
                {value == 'cross' && <img className="w-100 h-100" src={cross} alt="" />}
            </div>
        </div>
    );
};

export default Playground;