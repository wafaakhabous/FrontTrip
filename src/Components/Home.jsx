import React, { Component } from 'react';
import Info from './Info';
import Services from './Services';
import Process from './Process';
import BlogPost from './BlogPost';
import Comments from './Comments';
import AboutUs from './AboutUs';
import Navbar from './Navbar';

class Home extends Component {
    render() {
        return (
            <div>
                <Navbar/>
                <Info/>
                <Services/>
                <AboutUs/>
                {/* <BlogPost/>
                <Comments/> */}
            </div>
        );
    }
}

export default Home;