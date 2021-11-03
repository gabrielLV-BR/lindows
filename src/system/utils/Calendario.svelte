<script>
  import { clickOutside } from "../../modules/clickOutside";
  export let handleClickOutside = (_) => null;
</script>

<div class="calendario" use:clickOutside on:click_outside={handleClickOutside}>
  <p id="mes">Novembro</p>
  <table>
    <thead id="diaSemana">
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
    <tbody id="diaMes">
      <tr>
        <td class="mesDiferente">31</td>
        <td>1</td>
        <td id="hoje">2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
      </tr>
      <tr>
        <td>7</td>
        <td>8</td>
        <td>9</td>
        <td>10</td>
        <td>11</td>
        <td>12</td>
        <td>13</td>
      </tr>
      <tr>
        <td>14</td>
        <td>15</td>
        <td>16</td>
        <td>17</td>
        <td>18</td>
        <td>19</td>
        <td>20</td>
      </tr>
      <tr>
        <td>21</td>
        <td>22</td>
        <td>23</td>
        <td>24</td>
        <td>25</td>
        <td>26</td>
        <td>27</td>
      </tr>
      <tr>
        <td>28</td>
        <td>29</td>
        <td>30</td>
        <td>31</td>
        <td class="mesDiferente">1</td>
        <td class="mesDiferente">2</td>
        <td class="mesDiferente">3</td>
      </tr>
    </tbody>
  </table>
</div>

<style lang="scss">
  * {
    margin: 0;
    padding: 0;
  }
  .calendario {
    opacity: .9;
    position: fixed;
    right: 0;
    bottom: 4rem;

    padding: 1rem;
    border-radius: 0.5rem;
    background: var(--background-1);

    overflow: hidden;
    text-align: center;
  }
  p {
    font-size: 1.3rem;
    font-weight: bold;
    padding: .5rem 1.5rem 1.5rem 1.5rem;
  }
  #hoje {
    border: 1px solid var(--font-color-2);
  }
  .mesDiferente {
    color: var(--font-color-3);
  }
  td {
    text-align: center;
    font-size: 1.1rem;
    color: var(--font-color-2);
  }
  #diaMes td {
    padding: 0.1rem 0.3rem 0.1rem 0.3rem;
    border-radius: 0.1rem;
    &:hover {
      background-color: var(--background-2);
    }
  }
  #diaSemana td {
    padding: 0 0.3rem 1rem 0.3rem;
  }
</style>
