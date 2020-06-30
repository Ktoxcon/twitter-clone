const { CommandParser } = require("./command_verificator");

describe("Parsing Req for obtain a command and its args", () => {
  it("It should return a object with the command and the args", () => {
    const req = { body: { command: "add arg1 [this is a tweet]" } };
    const req1 = {
      body: {
        command: " register    [jose perez] jorge1 jorge@kinal.edu.gt fuck666 ",
      },
    };
    //  const req2 = { body:{command:"login   arg arg arg"}};
    //  const req3 = { body:{command:" login  arg  arg  arg "}};

    expect(CommandParser(req)).toEqual({
      command: "add",
      args: ["this is a tweet","arg1"],
    });
    expect(CommandParser(req1)).toEqual({
      command: "register",
      args: ["jose perez","jorge1", "jorge@kinal.edu.gt", "fuck666"],
    });
    //  expect(CommandParser(req2)).toEqual({command:"login",args:["arg","arg","arg"]});
    //  expect(CommandParser(req3)).toEqual({command:"login",args:["arg","arg","arg"]});
  });
});

/*
describe('Matching Command', () => {
    it('It should return the command', () => {
        const command = {command:"login",args:["arg","arg","arg"]};
        const command2 = {command:"add_tweet",args:["arg","arg","arg"]};
        const command3 = {command:"any",args:["arg","arg","arg"]};

        expect(CommandMatcher(command)).toEqual("LOGIN");
        expect(CommandMatcher(command2)).toEqual("ADD_TWEET");
        expect(CommandMatcher(command3)).toEqual("Unrecognized command");
    });
    
});
*/
/*
describe('Validating Args', () => {
    it('it should return true if the length of the args in a command is correct', () => {
        const command = {command:"login",args:["arg","arg"]};
        const command2 = {command:"add_tweet",args:["arg"]};
        expect(ArgumentValidator(command)).toBe(true);
        expect(ArgumentValidator(command2)).toBe(true);
    });
    
});*/

// describe('Matching large arguments', () => {
//     it('It should return all the words between two marks', () => {

//         const commmand = "command [pedro juarez] [juan jimenez] lpplp";
//         expect(largeArgument(commmand)).toStrictEqual(expected);
//     });
// });
