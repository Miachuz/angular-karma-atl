import {ComponentFixture, TestBed, waitForAsync} from "@angular/core/testing";
import {HeroesComponent} from "./heroes.component";
import {HeroServiceMock, resetHeroes} from "../mocks/hero-service.mock";
import {HeroService} from "../hero.service";
import {RouterTestingModule} from "@angular/router/testing";
import {By} from "@angular/platform-browser";
import {render, screen, fireEvent, findByRole, findAllByRole} from '@testing-library/angular';
import debugLog = jasmine.debugLog;
import userEvent from '@testing-library/user-event';
import {input} from "@testing-library/user-event/event/input";

fdescribe('Heroes', () => {

  it('should exist', async () => {
    const {container} = await renderComponent();

    expect(container).toBeTruthy();
  })

  it('should display heroes', async () => {
    const {container} = await renderComponent();
    const heroesList = await findHeroesList(container);

    expect(heroesList.length).toEqual(9);
  })

  it('should add hero and display in list', async () =>
  {
    const {container} = await renderComponent();
    const user = userEvent.setup();
    const fakehero = "Fake Hero";

    const heroInputField = await screen.findByLabelText(/Hero name:/i);
    await user.type(heroInputField, fakehero);

    const addButton = await screen.findByText(/Add hero/i);
    await user.click(addButton);

    const addedHero = await screen.findAllByText(fakehero);

    const thing = 2;
    expect(addedHero).toBeTruthy();
  })

  it('should delete hero and display correctly', async () =>
  {
    const {container} = await renderComponent();
    const user = userEvent.setup();

    const deleteButtons = await screen.findAllByText('x');
    await user.click(deleteButtons[0]);

    const heroesList = await findHeroesList(container);

    expect(heroesList.length).toEqual(8)
  })
})

async function renderComponent()
{
  resetHeroes();
  return await render(HeroesComponent, {
    declarations: [HeroesComponent],
    imports:[RouterTestingModule.withRoutes([])],
    providers: [{provide: HeroService, useClass: HeroServiceMock}]
  })
}

async function findHeroesList(container: Element)
{
  return await findAllByRole(container.querySelector('ul') as HTMLElement, 'link');
}
