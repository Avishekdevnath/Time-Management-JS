document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    const buttons = document.querySelectorAll('nav button');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const targetSection = button.id.replace('-btn', '-section');
            
            sections.forEach(section => {
                section.style.display = 'none'; // Hide all sections
            });
            
            document.getElementById(targetSection).style.display = 'block'; // Show the selected section
        });
    });
});
