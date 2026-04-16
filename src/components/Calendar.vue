<script setup lang="ts"></script>

<template>
    <button class="calendar-button">Today</button>
    <calendar-header>
        <month-year>April 2026</month-year>
        <button class="calendar-button"><-MAR</button>
        <button class="calendar-button">MAY-></button>
    </calendar-header>

    <week-days><p>Su</p><p>M</p><p>Tu</p><p>W</p><p>Th</p><p>F</p><p>Sa</p></week-days>
    <week-days><p></p><p></p><p></p><p>1</p><p>2</p><p>3</p><p>4</p></week-days>
    <week-days><p>5</p><p>6</p><p>7</p><p>8</p><p>9</p><p>10</p><p>11</p></week-days>
    <week-days><p>12</p><p>13</p><p>14</p><p>15</p><p>16</p><p>17</p><p>18</p></week-days>
    <week-days><p>19</p><p>20</p><p>21</p><p>22</p><p>23</p><p>24</p><p>25</p></week-days>
    <week-days><p>26</p><p>27</p><p>28</p><p>29</p><p>30</p><p></p><p></p></week-days>

    <button class="calendar-button">+ New</button>
</template>

<style scoped>
    calendar-header {
        display: grid;
        grid-template: "prev-month month-year next-month";
    }

    month-year {
        grid-area: month-year;
        justify-self: center;
        font-size: 30px;
        font-weight: bold;
        margin: 10px;
    }

    week-days {
        display: grid;
        grid-auto-flow: column;
    }

    .calendar-button {
        margin: 5px;
        padding: 5px;
        background-color: blue;
        color: white;
        font-size: 15px;
    }
</style>