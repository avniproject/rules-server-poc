import rulesService from '../service/RulesService';
import {programEnocunter} from '../RuleExecutor';

const generateRules = (req, res, next) => {
  rulesService.findRulesById(req.body, res, next) 
    .then(async function (data) {
        const rulevalidated = await programEnocunter(JSON.parse(JSON.stringify(data))[0].rules,req.body);
        res.status(200)
            .json({
                status: 'success',
                data: rulevalidated
            });
    })
      .catch(function (err) {
        return next(err);
      });
}

module.exports = {
  generateRules: generateRules
};