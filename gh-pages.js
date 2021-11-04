var ghpages = require('gh-pages');

ghpages.publish(
    'public', // path to public directory
    {
        branch: 'gh-pages',
        repo: 'https://github.com/gabrielLV-BR/lindows.git', // Update to point to your repository  
        user: {
            name: 'Gabriel L', // update to use your name
            email: 'gabriellovato15@gmail.com' // Update to use your email
        }
    },
    () => {
        console.log('Deploy Complete!')
    }
)