import React from 'react';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.

const AboutPage = () => (
    <div>
        <div className="about-div">
            <article>
            <p>
                Ever get to the store and see strawberry jam on your list, 
                only to be faced with ten different brands and no idea which one
                is the preferred one for your household?
                SSA will help you track the brands and types of goods preferred
                by your family/household and easily look these up while you are shopping.
            </p>
            </article>
        </div>
    </div>
);

export default AboutPage;
