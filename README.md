# REACT-Losowanie-skladow
Aplikacja do generowania meczy 3vs3. Przydatne w grach drużynowych :)

## Instalacja
1. Utwórz nowy projekty korzystając z komendy `npx create-react-app [nazwa_aplikacji]`.
1. Przejdź do katalogu nowo utworzonego projektu `cd [nazwa_aplikacji]`.
1. Dodaj do projektu **React Router** korzystając z komendy `npm install react-router-dom`.
1. Usuń wszystkie pliki z katalogu `/src`, a następnie wklej do niego wszystkie pliki z repozytorium(z wyjątkiem folderu `/images` i pliku `README.md`).

## Opis działania aplikacji
### Strona startowa- `/Components/Inputs.jsx`
Strona startowa składa się z 6. pól tekstowych, przycisku `GENERUJ MECZE` oraz przycisku `RESET`.

Należy wypełnić wszystkie 6 pól imionami zawodników, a następnie przycisnąć przycisk `GENERUJ MECZE`, by przejść dalej.

Poniższe warunki muszą być spełnione, żeby wygenerować mecze!
1. Wszystkie pola są uzupełnione.
1. W polach tekstowych nie powtarzają się imiona.
1. Nie zostały rozegrane jeszcze żadne mecze.
W przeciwnym wypadku na ekranie pojawi się odpowiednie powiadomienie `/Components/Popup.jsx`.

Po kliknięciu przycisku "RESET" pojawi się ostrzeżenie. 
* Kliknięcie `TAK` spowoduje zresetowanie wszystkich inputów, a także usunięcie wszystkich zawodników oraz ich statystyk z "bazy danych", a także wszystkie rozegrane mecze. 
* Kliknięcie przycisku `NIE` spowoduje tylko zamknięcie pola z ostrzeżeniem.

Po kliknięciu przycisku `GENERUJ MECZE` zostanie wyświetlona tabela z wszystkimi możliwymi meczami, które można rozegrać. 
Każda drużyna jest unikatowa (nie powtarza się).

![Screen pierwszej strony aplikacji](/images/home.jpg)

### Tabela meczy- `/Components/Table.jsx`
Każdy wiersz w tablicy może zostać naciśnięty, co spowoduje wyświetlenie się okna z statystykami tego meczu.
Aby można było zatwierdzić mecz należy wypełnić pole `Wynik` (np: 3 - 0).
Jeśli jakieś pole w sekcji `Wynik` zostanie puste program automatycznie wpisze w nie zero.
Część `Bramki` może zostać całkowicie pominięta.

Zatwierdzony mecz zostanie odpowiednio zaznaczony w tabeli.

Ukończony mecz może zostać edytowany po kliknięciu na niego `/Components/MatchInfo.jsx`.

![Screen tabeli meczy](/images/table.jpg)

### Statystyki- `/Components/PlayersInfo.jsx`
Jeśli chociaż jeden mecz został rozegrany to w sekcji `STATYSTYKI` będą dostępne dodatkowe dane.
Pierwsza część owej sekcji ukazuje takie statystyki jak:
Z - zwycięstwa,
P - porażki,
G - zdobyte gole.
Druga część pokazuje, który z zawodników: zdobył najwięcej bramek, wygrał najwięcej meczy, strzelił najmniej bramek, przegrał najwiecej meczy.

![Screen okna statystyk](/images/stats.jpg)

## Mobilna aplikacja
Pierwotnie projekt ten miał być aplikacją mobilną dlatego też najlepiej korzystać z niego w taki właśnie sposób. W przyszłości projekt ten powninien zostać przepisany do **React Native**.
