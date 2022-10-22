<script>
  import {
    LICENSE_URL,
    CONTRIBUTORS_URL,
    SO_USER_TAGS_URL,
    SEDE_QUERY_URL,
    STATIC_TAGS_URL,
    ADD_TAG_ISSUE_LINK,
  } from "$lib/constants";
</script>

<div class="accordion mt-2" id="accordion">
  <div class="accordion-item">
    <h3 class="accordion-header" id="connectedToSO">
      <button
        class="accordion-button collapsed text-black"
        type="button"
        data-bs-toggle="collapse"
        aria-expanded="false"
        data-bs-target="#connectedToSOBody"
        aria-controls="connectedToSOBody"
      >
        Is this project affiliated to Stackoverflow?
      </button>
    </h3>
    <div
      id="connectedToSOBody"
      class="accordion-collapse collapse bg-body"
      aria-labelledby="connectedToSO"
      data-bs-parent="#accordion"
    >
      <div class="accordion-body">
        <p>
          stackoverflow-readme-profile is an independent open source project
          under the
          <a href={LICENSE_URL} target="_blank">GNU AGPLv3 license</a>
          developed by voluntary
          <a href={CONTRIBUTORS_URL} target="_blank">contributors</a>. This one
          uses different products from Stackoverflow but is not affiliated to
          the brand.
        </p>
      </div>
    </div>
  </div>

  <div class="accordion-item">
    <h3 class="accordion-header" id="whyUseIt">
      <button
        class="accordion-button collapsed text-black"
        type="button"
        data-bs-toggle="collapse"
        aria-expanded="false"
        data-bs-target="#whyUseItBody"
        aria-controls="whyUseItBody"
      >
        Why would I use it?
      </button>
    </h3>
    <div
      id="whyUseItBody"
      class="accordion-collapse collapse bg-body"
      aria-labelledby="whyUseIt"
      data-bs-parent="#accordion"
    >
      <div class="accordion-body">
        <p>
          Stackoverflow is one of the biggest platforms that every developer
          knows by name. This platform values relevant questions and answers as
          well as communication skills by means of a scoring system called
          <em class="text-primary">reputation</em>.
        </p>
        <p>
          Sharing your reputation with other developers or recruiters on your
          website or READMEs will help share the motivation you have for the
          development world.
        </p>
        <p>
          Also it may be interesting to see your reputation rank for specifics
          technologies among all Stackoverflow users, which is a very large part
          of the developers.
        </p>
      </div>
    </div>
  </div>

  <div class="accordion-item">
    <h3 class="accordion-header" id="tagLeague">
      <button
        class="accordion-button collapsed text-black"
        type="button"
        data-bs-toggle="collapse"
        aria-expanded="false"
        data-bs-target="#tagLeagueBody"
        aria-controls="tagLeagueBody"
      >
        What is the Tags League?
      </button>
    </h3>
    <div
      id="tagLeagueBody"
      class="accordion-collapse collapse bg-body"
      aria-labelledby="tagLeague"
      data-bs-parent="#accordion"
    >
      <div class="accordion-body">
        <p>
          The Tags League calculates a ranking of reputations among all
          Stackoverflow users in a specific technology (tag).
        </p>
        <p>
          This ranking then allows to quickly determine the rank of a user for a
          given tag like
          <em class="fw-bold">
            "top 24% Stack Overflow answerers in the technology javascript"
          </em>.
        </p>
        <p>
          The Tags League then allows you to share a ranking badge (a small
          dynamic image of your rank) on your website or README in addition to a
          dedicated web page of your rank serving as "certification".
        </p>
      </div>
    </div>
  </div>

  <div class="accordion-item">
    <h3 class="accordion-header" id="requirements">
      <button
        class="accordion-button collapsed text-black"
        type="button"
        data-bs-toggle="collapse"
        aria-expanded="false"
        data-bs-target="#requirementsBody"
        aria-controls="requirementsBody"
      >
        Requirements to be part of the Tags League
      </button>
    </h3>
    <div
      id="requirementsBody"
      class="accordion-collapse collapse bg-body"
      aria-labelledby="requirements"
      data-bs-parent="#accordion"
    >
      <div class="accordion-body">
        <ul>
          <li>
            The tag must be listed in the
            <a href="/tags-league"> tag list </a>
          </li>
          <li>You must have a Stackoverflow account</li>
          <li>
            You must have a score reputation greater than 2
            <b class="text-decoration-underline">for the tag</b> (check in
            <a href={SO_USER_TAGS_URL}> your tags list</a>)
          </li>
        </ul>
      </div>
    </div>
  </div>

  <div class="accordion-item">
    <h3 class="accordion-header" id="computation">
      <button
        class="accordion-button collapsed text-black"
        type="button"
        data-bs-toggle="collapse"
        aria-expanded="false"
        data-bs-target="#computationBody"
        aria-controls="computationBody"
      >
        How is the Tags League computed?
      </button>
    </h3>
    <div
      id="computationBody"
      class="accordion-collapse collapse bg-body"
      aria-labelledby="computation"
      data-bs-parent="#accordion"
    >
      <div class="accordion-body">
        <p>
          The Tags League is computed every week by using the StackExchange Data
          Explorer (<a
            href="https://data.stackexchange.com/stackoverflow/queries"
            target="_blank">SEDE</a
          >).
        </p>

        <p>
          <a href={SEDE_QUERY_URL} target="_blank">A query</a>
          is used to retrieve the number of users by score for a specific tag. This
          allows to establish a score scale in percentage which enables to quickly
          determine the rank of a user according to his score.
        </p>

        <p>
          The tags available in the Tags League are stored in a
          <a href={STATIC_TAGS_URL} target="_blank">static JSON file</a>. You
          can propose to add one by
          <a href={ADD_TAG_ISSUE_LINK}>opening an issue</a>.
        </p>
      </div>
    </div>
  </div>
</div>
