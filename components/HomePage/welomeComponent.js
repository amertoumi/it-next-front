import React from 'react';

const isServer = typeof window === 'undefined'
const WOW = !isServer ? require('wow.js') : null


export default class WelcomeComponent extends React.Component {
    componentDidMount() {
        new WOW().init()
    }
    render() {
        return (
            <div className={"wow slideInUp mt-5"} data-wow-duration="3s" data-wow-delay="0.2s">
                <div className="mt-3 mb-3 pt-3 pb-3 text-center text-uppercase">
                <h1>Welcome on Inspire Talent Platform</h1>
                <h2>Freelancer & Recruiters</h2>
                </div>
                <div className="text-center fa-5x">
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur et minus nemo tempore obcaecati in incidunt quae,
                         sequi eaque? Magnam animi facilis, vero mollitia voluptatibus repellendus in? Neque, architecto natus.</p>
                </div>
            </div>
            )
    }
}