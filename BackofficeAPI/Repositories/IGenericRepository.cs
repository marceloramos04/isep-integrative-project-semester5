namespace Backoffice.Repositories;

public interface IGenericRepository<TEntity, TEntityId>
{
    //Task<TEntity> GetByIdAsync(TEntityId id);
    //Task<IEnumerable<TEntity>> GetAllAsync();
    Task<TEntity> Add(TEntity entity);
    //Task UpdateAsync(TEntity entity);
    //Task DeleteAsync(TEntity entity);
}