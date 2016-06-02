/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask HockeyFacts for a fact"
 *  Alexa: "Here's your Hockey fact: ..."
 */

/**
 * App ID for the skill
 */
var APP_ID = amzn1.echo-sdk-ams.app.HockeyFacts; //replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * Array containing Hockey facts.
 */
var Hockey_FACTS = [
    "The National Hockey League (NHL) was founded on November 22, 1917.",
    "The Montreal Canadiens have won the most Stanley Cups in league history.",
    "The diameter of a hockey puck is three inches.",
    "Bobby Hull shot the world's fastest slapshot at 118 miles per hour.",
    "The standard North American ice rink is 200 feet long and 85 feet wide.",
    "Wayne Gretzky holds league top 61 NHL records",
    "The Hockey Hall of Fame is located in Toronto, Ontario.",
    "Phil Esposito was the first NHL player to record 100 points in a season.",
    "Hockey pucks are frozen before play to prevent them from bouncing.",
    "Regulation hockey nets are six feet wide and four feet tall.",
    "The Stanley Cup is named after a former Canadian Governor General, Lord Stanley of Preston, who donated the trophy in 1893.",
    "The original Stanley Cup was only seven inches high.",
    "The Anaheim Ducks were named after the team in the Disney movie, The Mighty Ducks.",
    "The Zamboni was invented in 1949.",
    "Twelve women have their names engraved on the Stanley Cup, either as owners or team executives.",
    "Prior to the 1927-28 season, forward passes were not allowed in hockey.",
    "Prior to the 1960s, hockey sticks were straight.",
    "The first puck used during outdoor hockey in the 1800s was made of frozen cow dung.",
    "n 1924, ice hockey gained a place in the Winter Olympics.",
    "In 1888, the first Amateur Hockey Association was formed.",
    "The origin of ice hockey is unknown. Many believe ice hockey probably evolved from the game of field hockey that had been played in Northern Europe for centuries.",
    "Mario Lemieux and Wayne Gretzky are the only players to be named MVP of three NHL All-Star games.",
    "The Rangers and Devils are the only 2 teams in North American sports to never trade with each other.",
    "Wayne and Brent Gretzky hold the NHL record for most combined points for two brothers. Wayne has 2857 and Brent has 4.",
    "The vulcanized rubber that makes up a puck is a single giant molecule.",
    "The first NHL goal ever recorded was on December 19th, 1917.",
    "The shortest player who has played in the NHL was Roy Woters who measured 5 feet, 3 inches tall.",
    "The Slovakian women’s hockey team qualified for the 2010 Olympics by beating Bulgaria 82-0.",
    "An average professional hockey player during an average game can lose as much as 5 to 8 pounds.",
    "Doctors in British Columbia are banned from talking about hockey during surgery.",
    "If both of a NHL team's goalies are injured, they can choose any available goalie to suit up and play. This includes fans.",
    "Tiger Williams holds the record for most career penalty minutes in the NHL. He has spent approximately 2.7 days (3966 minutes) of his professional life in the penalty box.",
    "NHL does not own the Stanley Cup and any hockey team could potentially challenge for the trophy in the event of a season-long lockout.",
    "The 1919 Stanley Cup Finals was the only game where no winner was declared due to an influenza outbreak.",
    "The average NHL game uses 12 Hockey pucks.",
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * HockeyFacts is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var HockeyFacts = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
HockeyFacts.prototype = Object.create(AlexaSkill.prototype);
HockeyFacts.prototype.constructor = HockeyFacts;

HockeyFacts.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("HockeyFacts onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

HockeyFacts.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("HockeyFacts onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
HockeyFacts.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("HockeyFacts onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

HockeyFacts.prototype.intentHandlers = {
    "GetNewFactIntent": function (intent, session, response) {
        handleNewFactRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can ask Hockey Geek tell me a Hockey fact, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleNewFactRequest(response) {
    // Get a random Hockey fact from the Hockey facts list
    var factIndex = Math.floor(Math.random() * Hockey_FACTS.length);
    var fact = Hockey_FACTS[factIndex];

    // Create speech output
    var speechOutput = "Here's your Hockey fact: " + fact;

    response.tellWithCard(speechOutput, "HockeyFacts", speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the HockeyFacts skill.
    var HockeyFacts = new HockeyFacts();
    HockeyFacts.execute(event, context);
};

