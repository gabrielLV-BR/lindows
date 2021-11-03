<style>
    h1{
    text-align: center;
    width: 100%;
    border: 2px;
    border-radius: 3px; 
    color: var(--font-color-0)  
}

table{
    margin: 0 auto;
    border: 2px;
    border-radius: 3px;
    border-style: groove;
}
thead td{
    color: var(--font-color-0);
}
#dias td{
    border: 2px;
    border-radius: 5px;
    height: 50px;
    width: 50px;
    border-style: groove;
    color: var(--font-color-0);
}

</style>

<div class="calendario">
    <header>
        <h1 id="mes">Novembro</h1>
        <a class="btn-ant" id="btn_prev" />
        <a class="btn-pro" id="btn_next" />
    </header>
    <table>
        <thead>
            <tr>
                <td>Dom</td>
                <td>Seg</td>
                <td>Ter</td>
                <td>Qua</td>
                <td>Qui</td>
                <td>Sex</td>
                <td>Sáb</td>
            </tr>
        </thead>
        <tbody id="dias">
            <tr>
                <td>1</td>
                <td>2</td>
                <td>3</td>
                <td>4</td>
                <td>5</td>
                <td>6</td>
                <td>7</td>
            </tr>
            <tr>
                <td>8</td>
                <td>9</td>
                <td>10</td>
                <td>11</td>
                <td>12</td>
                <td>13</td>
                <td>14</td>
            </tr>
            <tr>
                <td>15</td>
                <td>16</td>
                <td>17</td>
                <td>18</td>
                <td>19</td>
                <td>20</td>
                <td>21</td>
            </tr>
            <tr>
                <td>22</td>
                <td>23</td>
                <td>24</td>
                <td>25</td>
                <td>26</td>
                <td>27</td>
                <td>28</td>
            </tr><tr>
                <td>29</td>
                <td>30</td>
                <td>31</td>
            </tr>
        </tbody>
    </table>
</div>
