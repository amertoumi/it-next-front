import React from 'react';

const isServer = typeof window === 'undefined'
const WOW = !isServer ? require('wow.js') : null


export default class WelcomeComponent extends React.Component {
    componentDidMount() {
        new WOW().init()
    }
    render() {
        return (
            <div className={"wow slideInLeft"} data-wow-duration="3s" data-wow-delay="0.5s">
                <div className="mt-3 mb-3 pt-3 pb-3 text-center text-uppercase">
                <h1>Happy to see you on Inspire Talent Platform</h1>
                </div>
            </div>
            )
    }
}