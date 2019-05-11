# What is 0change?

0change is an open-source, zero-fee, peer-to-peer crypto exchange platform. We are an exchange in which users can buy and sell their preferred crypto assets to and from each other using their local currencies or other payment methods. 

0change.com has some characteristics:

- 0change.com asks for absolutely zero fee. It has an open source development and is fed by grants and donations. 

- Its governance is also decentralized so it does not belong to any entity. It is governed in a decentralized manner by an Aragon DAO.

- 0Change also can handle the disputes in a decentralized manner and users do not need to trust the admins.

- And last but not least, instead of requiring a KYC, it relies on BrightID which is a decentralized identification system. 

## Build Setup

``` bash
# clone 0change-frontend repository
$ git clone https://github.com/0change/0change-frontend.git

# install depenencies
$ cd 0change-frontend
$ npm install

# update config parameters
$ cp .env-example .env
$ nano .env

# start the frontend
$ pm2 start pm2.config.js 
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).
