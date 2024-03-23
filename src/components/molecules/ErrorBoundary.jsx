import React from "react";


export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
        this.eventHandler = this.updateError.bind(this);
    }

    componentDidMount() {
        window.addEventListener('error', this.eventHandler)
    }

    componentWillUnmount() {
        window.removeEventListener('error', this.eventHandler)
    }

    componentDidUpdate() {
        const { hasError = false, error = null } = this.state;
        console.log('error is: >>>> : ', error) //this log will not display because of navigation. to see the log please comment the navigation.
        // console.log('loooo pathan me ', window.location.pathname)

        if (hasError && window.location.pathname != '/system_error') {
            window.location.href = '/system_error';
        }
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        this.updateError(error)
    }

    updateError(error = null) {
        this.setState({ hasError: true, error: error });
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true, error: error };
    }



    render() {
        // if (this.state.hasError) {
        //     // You can render any custom fallback UI
        //     return <h1>Something went wrong.</h1>;
        // }

        if (this.state.hasError) {
            return null;
        }

        return this.props.children;
    }
}