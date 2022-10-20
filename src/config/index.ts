import type { Notifications } from './types';

const title = 'Kvide';

const email = 'haavasma@stud.ntnu.no';

const repository = 'https://github.com/tpk5100-pg05/smerteboken';

const messages = {
  app: {
    crash: {
      title: 'Oooops... Sorry, I guess, something went wrong. You can:',
      options: {
        email: `contact with author by this email - ${email}`,
        reset: 'Press here to reset the application',
      },
    },
  },
  loader: {
    fail: 'Hmmmmm, there is something wrong with this component loading process... Maybe trying later would be the best idea',
  },
  images: {
    failed: 'something went wrong during image loading :(',
  },
  404: 'Hey bro? What are you looking for?',
};

const notifications: Notifications = {
  options: {
    autoHideDuration: 3000,
  },
};

const loader = {
  // no more blinking in your app
  delay: 300, // if your asynchronous process is finished during 300 milliseconds you will not see the loader at all
  minimumLoading: 700, // but if it appears, it will stay for at least 700 milliseconds
};

const defaultMetaTags = {
  image: '/cover.png',
  description: 'Starter kit for modern web applications',
};
const giphy404 = 'https://giphy.com/embed/xTiN0L7EW5trfOvEk0';

export { loader, notifications, messages, repository, email, title, defaultMetaTags, giphy404 };
