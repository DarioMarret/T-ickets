import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

/*export const ExampleSlideout = () => {

    return (
        <Slideout
            btnText="Click Me"
            title="Filtrar"
        >
            <p></p>
        </Slideout>
    )
}
*/

export const Slideout = ({
    title,
    btnText,
    children,
    className,
    isOpen = false,
    width = 500,
    id,
}) => {

    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(isOpen);
    }, [isOpen]);

    const addedClasses =
        `${className ? ` ${className}` : ''}` +
        `${open ? ' cc-slideout-open' : ' cc-slideout-closed'}`;

    const slideoutId = id || 'slideout-' + Math.floor(Math.random() * 9999999);

    const slideoutComponent = (
        ReactDOM.createPortal(
            <div className={`cc-slideout-container${addedClasses}`} id={slideoutId}>

                <button
                    className="cc-slideout-overlay"
                    onClick={() => setOpen(false)}
                    aria-label="Close Slideout"
                />
                <div className="cc-slideout" style={{ width: `${width}px` }}>

                    <div className="cc-slideout-header">
                        <h3 className="cc-slideout-title">{title}</h3>
                        <button
                            className="cc-slideout-close"
                            onClick={() => setOpen(false)}
                            aria-label="Close Slideout"
                        />
                    </div>

                    <div className="cc-slideout-body">
                        {children}
                    </div>

                </div>

            </div>,
            document.body
        )
    );

    return (<>
        <button
            className="cc-open-slideout cc-button shrink  btn-default btn"
            onClick={() => setOpen(!open)}
            aria-haspopup="dialog"
            aria-controls={slideoutId}
        >
            {btnText}
        </button>
        {slideoutComponent}
    </>
    )
};

Slideout.propTypes = {
    title: PropTypes.string,
    btnText: PropTypes.string,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    isOpen: PropTypes.bool,
    width: PropTypes.number,
    id: PropTypes.string,
}