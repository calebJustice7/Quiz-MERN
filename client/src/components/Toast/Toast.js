import React from 'react';
import $ from 'jquery';

export default class Toast extends React.Component {

    constructor(props) {
        super(props);
        this.toastRef = React.createRef()
    }

    componentDidMount() {
        $(this.toastRef.current).hide();
    }

    hideScreen = () => {
        $(this.toastRef.current).fadeIn(200);
        document.getElementsByTagName('html')[0].style.overflow = 'hidden';
    }

    showScreen = () => {
        $(this.toastRef.current).fadeOut(200);
        document.getElementsByTagName('html')[0].style.overflow = 'auto';
    }

    render() {
        let theChild = undefined;
        if(this.props.model === true) {
            this.hideScreen();
        } else {
            this.showScreen();
        }
            theChild = <div ref={this.toastRef} style={{overflow: 'scroll', position: 'absolute', top: '15px', right: '15px', zIndex: this.props.zIndex ? this.props.zIndex : 20, backgroundColor: this.props.backgroundColor ? this.props.backgroundColor : '#30D158', widht: 'fit-content', color: 'white', borderRadius: '5px', padding: '20px 30px'}}>
                {this.props.message}
            </div>
        return (
            <div>
                {theChild}
            </div>
        )
    }
}