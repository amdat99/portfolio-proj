import React from 'react';
import 'Error-boundry.scss'

class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
    }
  
    componentDidCatch(error, errorInfo) {
      // You can also log the error to an error reporting service
      logErrorToMyService(error, errorInfo);
    }
  
    render() {
      if (this.state.hasError) {
                return (
                <div className='error-container'>
                    <img  src ='https://i.imgur.com/A040Lxr.png' width='300' height='300' />
                        <span> the page got lost sorry </span>
                </div>)
            }
        return this.props.children
    }
}
export default ErrorBoundary;