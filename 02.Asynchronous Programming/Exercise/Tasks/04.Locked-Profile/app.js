async function lockedProfile() {
    const mainSection = document.getElementById('main');
    const url = 'http://localhost:3030/jsonstore/advanced/profiles';
    const divProfile = document.querySelector('.profile');

    const response = await fetch(url);
    const profiles = await response.json();

    Object.values(profiles).forEach(person => {
        const profile = divProfile.cloneNode(true);
        mainSection.appendChild(fillingProfile(profile,person));
    })
    mainSection.children[0].remove();

    function fillingProfile(profile, person){
        profile.querySelector('input[name = "user1Username"]').value = person.username;
        profile.querySelector('input[name = "user1Email"]').value = person.email;
        profile.querySelector('input[name = "user1Age"]').value = person.age;
        profile.querySelector('input[name = "user1Age"]').type = 'email';

        const div = profile.getElementsByClassName('user1Username')[0];
        div.className = '';
        div.id = 'userHiddenFields';
        div.style.display = 'none';

        profile.querySelector('button').addEventListener('click', showMore);

        return profile;
    }

    function showMore(e){
       
        const profile = e.currentTarget.parentNode;
        const unlock = profile.querySelector('input[value="unlock"]').checked;

        if(unlock){
            if (e.currentTarget.textContent == 'Show more') {
                profile.querySelector('#userHiddenFields').style.display = 'block';
                e.currentTarget.textContent = 'Hide it';
            }else{
                profile.querySelector('#userHiddenFields').style.display = 'none';
                e.currentTarget.textContent = 'Show more';
            }
        }else{
           
        }
    }
    
}