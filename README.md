# Feed reader | React

Some days ago I needed to integrate my [blog posts](http://dodu.it/?post_type=post) on my other [website](http://andre-i.eu/#blog). Both domains points to the same host. I could access to the database by implementing a server for andre-i.eu and retrieve what I needed for the website, but I remembered that my blog generates a feed RSS xml. I needed to implement a feed reader in React and play with CORS origin. 
Therefore I pushed this component, perhaps could be usefull also for you.

# Run it
```
yarn start
```

In order to see some results go to https://cors-anywhere.herokuapp.com/corsdemo and click on the "Request temporary access to the demo server".
