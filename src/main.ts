import PixiBingo from './controllers/PixiBingo';

let bingo:PixiBingo;

document.addEventListener('DOMContentLoaded', function () {
    createBingo();
});

function createBingo(): void {
    const bingo = new PixiBingo();
}