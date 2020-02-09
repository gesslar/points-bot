# points-bot
This is a Discord bot where users can grant imaginary internet points to their peers. Feel free to fork or whatever. If you want to improve upon it, feel free to submit a pull request.

# Setup
Create a `.env` file in the root of your project and include the following lines in it:

    DISCORD_TOKEN = [paste your Discord bot token]
    POINTS_FILE = data/points.json

Whatever file you decide to have, you should ensure it exists and without any member in it. A simple
````
{}
````
will do.

Invite the bot!

# Usage
In a channel, simply mention users (one or more) and type ++ to grant them imaginary internet points.

    @geslar ++
